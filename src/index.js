import * as PIXI from 'pixi.js'

const Sprite = PIXI.Sprite

const States = {
    IDLE: 'idle',
    ITEM: 'item',
    END: 'end',
}

const app = new PIXI.Application({
    width: 512,
    height: 512,
    antialias: true,
    backgroundColor: 0xffffff
})

document.getElementById('canvasContainer').appendChild(app.view)

const loader = PIXI.Loader.shared

const sprites = {}

const resConfigs = {
    kmr: {
        full: 'assets/kmr/avatar.png',
        face: 'assets/kmr/face.png',
        widgets: [
            {
                name: 'eye-l',
                hint: 'move left eye',
                src: 'assets/kmr/eye-l.png'
            },
            {
                name: 'eye-r',
                hint: 'move right eye',
                src: 'assets/kmr/eye-r.png'
            },
            {
                name: 'eyebow-l',
                hint: 'move left eyebow',
                src: 'assets/kmr/eyebow-l.png'
            },
            {
                name: 'eyebow-r',
                hint: 'move right eyebow',
                src: 'assets/kmr/eyebow-r.png'
            },
            {
                name: 'nose',
                hint: 'move nose',
                src: 'assets/kmr/nose.png'
            },
            {
                name: 'mouth',
                hint: 'move mouth',
                src: 'assets/kmr/mouth1.png'
            },
            {
                name: 'nevus',
                hint: 'move nevus',
                src: 'assets/kmr/nevus.png'
            },
            {
                name: 'hairpin',
                hint: 'move hairpin',
                src: 'assets/kmr/hairpin.png'
            },
            {
                name: 'ring',
                hint: 'move ring',
                src: 'assets/kmr/ring.png'
            },
        ],
    },
    kmr1: {
        full: 'assets/kmr/avatar.png',
        face: 'assets/kmr/face.png',
        widgets: [
            {
                name: 'eye-l',
                hint: 'move left eye',
                src: 'assets/kmr/eye-l.png'
            },
            {
                name: 'eye-r',
                hint: 'move right eye',
                src: 'assets/kmr/eye-r.png'
            },
            {
                name: 'eyebow-l',
                hint: 'move left eyebow',
                src: 'assets/kmr/eyebow-l.png'
            },
            {
                name: 'eyebow-r',
                hint: 'move right eyebow',
                src: 'assets/kmr/eyebow-r.png'
            },
            {
                name: 'nose',
                hint: 'move nose',
                src: 'assets/kmr/nose.png'
            },
            {
                name: 'mouth',
                hint: 'move mouth',
                src: 'assets/kmr/mouth2.png'
            },
            {
                name: 'nevus',
                hint: 'move nevus',
                src: 'assets/kmr/nevus.png'
            },
            {
                name: 'hairpin',
                hint: 'move hairpin',
                src: 'assets/kmr/hairpin.png'
            },
            {
                name: 'ring',
                hint: 'move ring',
                src: 'assets/kmr/ring.png'
            },
        ],
    },
    kmr2: {
        full: 'assets/kmr/avatar.png',
        face: 'assets/kmr/face.png',
        widgets: [
            {
                name: 'eye-l',
                hint: 'move left eye',
                src: 'assets/kmr/eye-l.png'
            },
            {
                name: 'eye-r',
                hint: 'move right eye',
                src: 'assets/kmr/eye-r.png'
            },
            {
                name: 'eyebow-l',
                hint: 'move left eyebow',
                src: 'assets/kmr/eyebow-l.png'
            },
            {
                name: 'eyebow-r',
                hint: 'move right eyebow',
                src: 'assets/kmr/eyebow-r.png'
            },
            {
                name: 'nose',
                hint: 'move nose',
                src: 'assets/kmr/nose.png'
            },
            {
                name: 'mouth',
                hint: 'move mouth',
                src: 'assets/kmr/mouth3.png'
            },
            {
                name: 'nevus',
                hint: 'move nevus',
                src: 'assets/kmr/nevus.png'
            },
            {
                name: 'hairpin',
                hint: 'move hairpin',
                src: 'assets/kmr/hairpin.png'
            },
            {
                name: 'ring',
                hint: 'move ring',
                src: 'assets/kmr/ring.png'
            },
        ],
    }
}

const radioListener = (e) => {
    const id = document.querySelector('.form-check-input:checked').id
    console.log(`selected id ${id}`)
    currentConfig = resConfigs[id]
    gameData.reset()
    loadSprites(gameData.config)
}
for (let i of document.getElementsByClassName('form-check-input')) {
    i.addEventListener('click', radioListener)
}

let currentConfig = resConfigs.kmr
function loadConfig() {
    return currentConfig;
}

let gameData = {
    state: States.IDLE,
    config: loadConfig(),
    data: {
        index: 0,
    },
    reset: function() {
        const self = this
        self.state = States.IDLE,
        self.config = loadConfig();
        self.data = {
            index: 0
        }
        app.stage.removeChildren(0, app.stage.children.length)
    }
}

loadSprites(gameData.config)

function loadSprites(config) {
    loader.reset()
    loader
        .add(config.full)
        .add(config.face)
    for (let i of config.widgets) {
        loader.add(i.src)
    }
    
    loader.load((loader, resources) => {
        onResourceReady(resources, config)
    })
}

function onResourceReady(resources, config) {
    sprites.full = new Sprite(resources[config.full].texture)
    app.stage.addChild(sprites.full)
    sprites.face = new Sprite(resources[config.face].texture)
    sprites.face.visible = false
    app.stage.addChild(sprites.face)
    sprites.widgets = []
    for (let i of config.widgets) {
        const itemSprite = new Sprite(resources[i.src].texture)
        itemSprite.visible = false
        itemSprite.interactive = true
        itemSprite.buttonMode = true
        itemSprite.anchor.set(0.5)
        itemSprite.x = itemSprite.width / 2
        itemSprite.y = itemSprite.height / 2
        itemSprite
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove)
        sprites.widgets.push(itemSprite)
        app.stage.addChild(itemSprite)
    }

    
    setHint('Ready?')
    setButtonText('Start')

    app.ticker.add(delta => render())
}

const hint = document.getElementById('hint')
function setHint(content) {
    hint.innerText = content
}

const action = document.getElementById('action')
function setButtonText(content) {
    action.innerText = content
}
action.addEventListener('click', () => {
    switch (gameData.state) {
        case States.IDLE:
            gameData.state = States.ITEM
            gameData.data.index = 0
            setButtonText('Next')
            setHint(gameData.config.widgets[0].hint)

            console.log(app.stage.getChildIndex(sprites.full), app.stage.getChildIndex(sprites.face))
            break
        case States.ITEM:
            const next = gameData.data.index + 1
            if (next >= gameData.config.widgets.length) {
                gameData.state = States.END
                setButtonText('Restart')
                setHint('')
            } else {
                if (next == gameData.config.widgets.length - 1) {
                    // last widgets
                    setButtonText('Finish')
                }
                gameData.data.index = next
                setHint(gameData.config.widgets[next].hint)
            }
            break
        case States.END:
            gameData.state = States.IDLE
            setButtonText('Start')
            setHint('Ready?')
            for (let i of app.stage.children) {
                if (i !== sprites.face && i !== sprites.full) {
                    i.x = i.width / 2
                    i.y = i.height / 2
                }
            }
            break
    }
})

function render() {
    switch (gameData.state) {
        case States.IDLE:
            for (let i of app.stage.children) {
                if (i === sprites.full) {
                    if (!sprites.full.visible) {
                        sprites.full.visible = true
                    }
                } else {
                    i.visible = false
                }
            }
            break
        case States.ITEM:
            const currentSprite = sprites.widgets[gameData.data.index]
            currentSprite.interactive = true
            for (let i of app.stage.children) {
                if (i === currentSprite) {
                    if (i.visible == false) {
                        i.visible = true
                    }
                } else {
                    i.visible = false
                }
            }
            break
        case States.END:
            for (let i of app.stage.children) {
                if (i === sprites.full) {
                    i.visible = false
                } else {
                    i.visible = true
                    i.interactive = false
                }
            }
            break
    }
}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
}