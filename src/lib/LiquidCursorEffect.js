import * as PIXI from 'pixi.js';

export default class LiquidCursorEffect {
    constructor(containerSelector, options = {}) {
        this.container = typeof containerSelector === 'string'
            ? document.querySelector(containerSelector)
            : containerSelector;

        // 1. Default Configuration
        this.config = {
            baseImage: '',
            displacementMap: '',
            friction: 0.1,
            maxDistortion: 100,
            speedMultiplier: 3,
            ...options // Overwrite defaults with passed options
        };

        // 2. Accessibility Check
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return; // Abort if user prefers no motion

        this.mouse = { x: 0, y: 0 };
        this.prevMouse = { x: 0, y: 0 };
        this.currentScale = 0;

        this.init();
    }

    async init() {
        // Setup Pixi Application
        this.app = new PIXI.Application();
        await this.app.init({
            resizeTo: this.container,
            backgroundAlpha: 0, // Transparent background
            resolution: window.devicePixelRatio || 1 // High-DPI screen support
        });
        
        this.container.appendChild(this.app.canvas);

        // Await asset loading before rendering
        await this.loadAssets();
        this.setupFilters();
        this.bindEvents();
        
        // Start the loop
        this.app.ticker.add(this.update.bind(this));
    }

    async loadAssets() {
        // PIXI.Assets is the modern way to load textures asynchronously 
        this.baseTexture = await PIXI.Assets.load(this.config.baseImage);
        this.mapTexture = await PIXI.Assets.load(this.config.displacementMap);

        this.baseSprite = new PIXI.Sprite(this.baseTexture);
        this.mapSprite = new PIXI.Sprite(this.mapTexture);
        this.mapSprite.texture.source.addressMode = 'repeat';

        this.app.stage.addChild(this.baseSprite);
        this.app.stage.addChild(this.mapSprite);
    }

    setupFilters() {
        this.filter = new PIXI.DisplacementFilter(this.mapSprite);
        this.filter.scale.x = 0;
        this.filter.scale.y = 0;
        this.app.stage.filters = [this.filter];
    }

    bindEvents() {
        // Cache the bound function so we can remove it later
        this.onMouseMove = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        };
        window.addEventListener('mousemove', this.onMouseMove);
    }

    update() {
        // Background texture flow
        this.mapSprite.x += 1;
        this.mapSprite.y += 1;

        // Velocity tracking
        const dx = this.mouse.x - this.prevMouse.x;
        const dy = this.mouse.y - this.prevMouse.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        
        // Math using configuration variables
        const targetScale = Math.min(speed * this.config.speedMultiplier, this.config.maxDistortion);
        this.currentScale += (targetScale - this.currentScale) * this.config.friction;

        // Apply filter
        this.filter.scale.x = this.currentScale;
        this.filter.scale.y = this.currentScale;

        this.prevMouse.x = this.mouse.x;
        this.prevMouse.y = this.mouse.y;
    }

    // 3. Crucial Cleanup Method
    destroy() {
        if (!this.app) return;
        
        window.removeEventListener('mousemove', this.onMouseMove);
        
        // Destroy the Pixi app, clear WebGL context, and remove the canvas from the DOM
        this.app.destroy(true, {
            children: true,
            texture: true
        });
    }
}