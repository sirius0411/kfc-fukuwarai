import * as PIXI from 'pixi.js'
import {OutlineFilter} from '@pixi/filter-outline'
import { LibManifestPlugin } from 'webpack'

const resourceDir = 'https://cdn.jsdelivr.net/gh/sirius0411/kfc-fukuwarai/dist/'

const Sprite = PIXI.Sprite

const States = {
    IDLE: 'idle',
    ITEM: 'item',
    END: 'end',
}

const GameOverAudios = [
    'https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.21/dist/%E9%93%81%E5%92%A9%EF%BC%81Komori-Kick%EF%BC%81.mp3',
    'https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.13/dist/%E4%B8%8D%E6%98%AF%E6%88%91-%E4%BD%A0%E6%90%9E%E9%94%99%E4%BA%BA%E4%BA%86%EF%BC%81.mp3',
    'https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.1/dist/%E5%A4%AA%E5%A5%87%E6%80%AA%E4%BA%86%E5%90%A7%EF%BC%81.mp3',
    'https://cdn.jsdelivr.net/npm/komori-chiyu-button-assets@0.0.1/dist/%E4%B8%BA%E4%BB%80%E4%B9%88%E5%95%8A%E5%95%8A%E2%80%94%E2%80%94.mp3',
]

const standardSize = 512
const canvasSize = Math.min(window.innerWidth, standardSize)
const ratio = canvasSize / standardSize

console.log(`global scale ratio ${ratio}`)
// console.log(window.innerWidth, document.getElementsByClassName('container')[0].clientWidth, document.getElementById('canvasContainer').clientWidth)

const app = new PIXI.Application({
    width: canvasSize,
    height: canvasSize,
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
                name: 'hairpin',
                hint: 'move hairpin',
                src: 'assets/kmr/hairpin.png'
            },
            {
                name: 'eyebow-l',
                hint: 'move left eyebow',
                src: 'assets/kmr/eyebow-l.png'
            },
            {
                name: 'nose',
                hint: 'move nose',
                highlight: '鼻',
                src: 'assets/kmr/nose.png'
            },
            {
                name: 'mouth2',
                hint: 'move mouth',
                src: 'assets/kmr/mouth2.png'
            },
            {
                name: 'eye-r',
                hint: 'move right eye',
                src: 'assets/kmr/eye-r.png'
            },
            {
                name: 'rouge-r',
                hint: 'move right rouge',
                src: 'assets/kmr/rouge-r.png'
            },
            {
                name: 'nevus',
                hint: 'move nevus',
                highlight: 'ほくろ/痣',
                src: 'assets/kmr/nevus.png'
            },
            {
                name: 'mouth4',
                hint: 'move mouth',
                src: 'assets/kmr/mouth4.png'
            },
            {
                name: 'ring',
                hint: 'move ring',
                src: 'assets/kmr/ring.png'
            },
            {
                name: 'rouge-l',
                hint: 'move left rouge',
                src: 'assets/kmr/rouge-l.png'
            },
            {
                name: 'eyebow-r',
                hint: 'move right eyebow',
                src: 'assets/kmr/eyebow-r.png'
            },
        ],
    },
    kmr1: {
        full: 'assets/kmr1/avatar.png',
        face: 'assets/kmr/face.png',
        widgets: [
            {
                name: 'eye-l',
                hint: 'move left eye',
                src: 'assets/kmr1/eye-l.png'
            },
            {
                name: 'hairpin',
                hint: 'move hairpin',
                src: 'assets/kmr/hairpin.png'
            },
            {
                name: 'eyebow-l',
                hint: 'move left eyebow',
                src: 'assets/kmr1/eyebow-l.png'
            },
            {
                name: 'nose',
                hint: 'move nose',
                highlight: '鼻',
                src: 'assets/kmr/nose.png'
            },
            {
                name: 'mouth2',
                hint: 'move mouth',
                src: 'assets/kmr1/mouth.png'
            },
            {
                name: 'eye-r',
                hint: 'move right eye',
                src: 'assets/kmr1/eye-r.png'
            },
            {
                name: 'rouge-r',
                hint: 'move right rouge',
                src: 'assets/kmr/rouge-r.png'
            },
            {
                name: 'nevus',
                hint: 'move nevus',
                highlight: 'ほくろ/痣',
                src: 'assets/kmr/nevus.png'
            },
            {
                name: 'mouth4',
                hint: 'move mouth',
                src: 'assets/kmr/mouth4.png'
            },
            {
                name: 'ring',
                hint: 'move ring',
                src: 'assets/kmr/ring.png'
            },
            {
                name: 'rouge-l',
                hint: 'move left rouge',
                src: 'assets/kmr/rouge-l.png'
            },
            {
                name: 'eyebow-r',
                hint: 'move right eyebow',
                src: 'assets/kmr1/eyebow-r.png'
            },
        ],
    },
    kmr2: {
        full: 'assets/kmr2/avatar.png',
        face: 'assets/kmr/face.png',
        widgets: [
            {
                name: 'eye-l',
                hint: 'move left eye',
                src: 'assets/kmr2/eye-l.png'
            },
            {
                name: 'hairpin',
                hint: 'move hairpin',
                src: 'assets/kmr/hairpin.png'
            },
            {
                name: 'eyebow-l',
                hint: 'move left eyebow',
                src: 'assets/kmr/eyebow-l.png'
            },
            {
                name: 'nose',
                hint: 'move nose',
                highlight: '鼻',
                src: 'assets/kmr/nose.png'
            },
            {
                name: 'mouth2',
                hint: 'move mouth',
                src: 'assets/kmr/mouth2.png'
            },
            {
                name: 'eye-r',
                hint: 'move right eye',
                src: 'assets/kmr2/eye-r.png'
            },
            {
                name: 'rouge-r',
                hint: 'move right rouge',
                src: 'assets/kmr/rouge-r.png'
            },
            {
                name: 'nevus',
                hint: 'move nevus',
                highlight: 'ほくろ/痣',
                src: 'assets/kmr/nevus.png'
            },
            {
                name: 'mouth4',
                hint: 'move mouth',
                src: 'assets/kmr/mouth4.png'
            },
            {
                name: 'ring',
                hint: 'move ring',
                src: 'assets/kmr/ring.png'
            },
            {
                name: 'rouge-l',
                hint: 'move left rouge',
                src: 'assets/kmr/rouge-l.png'
            },
            {
                name: 'eyebow-r',
                hint: 'move right eyebow',
                src: 'assets/kmr/eyebow-r.png'
            },
        ],
    }
}

const presetListener = (e) => {
    const id = e.target.id
    currentConfig = resConfigs[id]
    gameData.reset()
    loadSprites(gameData.config)
}
for (let i of document.getElementsByClassName('preset-item')) {
    i.addEventListener('click', presetListener)
}

// const radioListener = (e) => {
//     const id = document.querySelector('.form-check-input:checked').id
//     console.log(`selected id ${id}`)
//     currentConfig = resConfigs[id]
//     gameData.reset()
//     loadSprites(gameData.config)
// }
// for (let i of document.getElementsByClassName('form-check-input')) {
//     i.addEventListener('click', radioListener)
// }

let currentConfig = resConfigs.kmr
function loadConfig() {
    return currentConfig;
}

let gameData = {
    state: States.IDLE,
    config: loadConfig(),
    data: {
        index: 0,
        widgetStates: {},
    },
    reset: function() {
        const self = this
        self.state = States.IDLE,
        self.config = loadConfig();
        self.data = {
            index: 0,
            widgetStates: {},
        }
        app.stage.removeChildren(0, app.stage.children.length)
    }
}

loadSprites(gameData.config)

function loadSprites(config) {
    loader.reset()
    loader
        .add(resourceDir + config.full)
        .add(resourceDir + config.face)
    for (let i of config.widgets) {
        loader.add(resourceDir + i.src)
    }
    
    loader.load((loader, resources) => {
        onResourceReady(resources, config)
    })
}

function applyScale(sprite) {
    sprite.anchor.set(0.5)
    sprite.scale.set(ratio, ratio)
}

function onResourceReady(resources, config) {
    sprites.full = new Sprite(resources[resourceDir + config.full].texture)
    sprites.full.scale.set(ratio, ratio)
    app.stage.addChild(sprites.full)
    sprites.face = new Sprite(resources[resourceDir + config.face].texture)
    sprites.face.visible = false
    sprites.face.scale.set(ratio, ratio)
    app.stage.addChild(sprites.face)
    sprites.widgets = []
    for (let i of config.widgets) {
        const itemSprite = new Sprite(resources[resourceDir + i.src].texture)
        itemSprite.name = i.name
        itemSprite.visible = false
        itemSprite.interactive = true
        itemSprite.buttonMode = true
        itemSprite.anchor.set(0.5)
        itemSprite.x = canvasSize / 2
        itemSprite.y = canvasSize / 2
        // itemSprite.x = itemSprite.width / 2
        // itemSprite.y = itemSprite.height / 2
        itemSprite
            .on('mousedown', onDragStart)
            .on('touchstart', onDragStart)
            .on('mouseup', onDragEnd)
            .on('mouseupoutside', onDragEnd)
            .on('touchend', onDragEnd)
            .on('touchendoutside', onDragEnd)
            .on('mousemove', onDragMove)
            .on('touchmove', onDragMove)
        applyScale(itemSprite)
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
action.addEventListener('click', (e) => {
    switch (gameData.state) {
        case States.IDLE:
            gameData.state = States.ITEM
            gameData.data.index = 0
            gameData.data.widgetStates = {}
            setButtonText('Next')
            setHint(gameData.config.widgets[0].hint)

            // console.log(app.stage.getChildIndex(sprites.full), app.stage.getChildIndex(sprites.face))
            break
        case States.ITEM:
            const currentSpriteName = gameData.config.widgets[gameData.data.index].name
            if (!gameData.data.widgetStates[currentSpriteName]) {
                gameData.data.widgetStates[currentSpriteName] = 'done'
            }
            if (e.target.innerText == 'Finish') {
                gameData.state = States.END
                setButtonText('Restart')
                setHint('')
                randomOverAudio()
                return
            }
            const next = gameData.data.index + 1
            if (next >= gameData.config.widgets.length) {
                gameData.state = States.END
                setButtonText('Restart')
                setHint('')
                randomOverAudio()
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
                    i.x = canvasSize / 2
                    i.y = canvasSize / 2
                }
            }
            break
    }
})

const skip = document.getElementById('skip')
skip.addEventListener('click', (e) => {
    const currentSpriteName = gameData.config.widgets[gameData.data.index].name
    gameData.data.widgetStates[currentSpriteName] = 'skip'
    let next = gameData.data.index + 1
    if (next >= gameData.config.widgets.length) {
        for (let i = 0; i < gameData.config.widgets.length; i++) {
            const item = gameData.config.widgets[i].name
            if (!gameData.data.widgetStates[item] || gameData.data.widgetStates[item] == 'skip') {
                next = i
                break
            }
        }
    }
    console.log(`skip next index ${next}`)
    if (next >= gameData.config.widgets.length) {
        skip.hidden = true
        return
    }
    if (next == gameData.config.widgets.length - 1) {
        // last widgets
        setButtonText('Finish')
    }
    gameData.data.index = next
    setHint(gameData.config.widgets[next].hint)
})

function render() {
    switch (gameData.state) {
        case States.IDLE:
            hint.hidden = true
            skip.hidden = true
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
            hint.hidden = true
            skip.hidden = false
            const currentItemConfig = gameData.config.widgets[gameData.data.index]
            const currentSprite = sprites.widgets[gameData.data.index]
            currentSprite.interactive = true
            for (let i of app.stage.children) {
                if (i === currentSprite) {
                    if (i.visible == false) {
                        i.visible = true
                        // outlined
                        if (currentItemConfig.highlight) {
                            i.filters = [new OutlineFilter()]
                        }
                    }
                } else {
                    i.visible = false
                    i.filters = null
                    hint.hidden = true
                }
            }
            if (currentItemConfig.highlight) {
                setHint(currentItemConfig.highlight)
                hint.hidden = false
            }
            break
        case States.END:
            hint.hidden = true
            skip.hidden = true
            for (let i of app.stage.children) {
                i.filters = null
                if (i === sprites.full) {
                    i.visible = false
                } else {
                    if (i.name) {
                        if (gameData.data.widgetStates[i.name] == 'done') {
                            i.visible = true
                        } else {
                            i.visible = false
                        }
                    } else {
                        i.visible = true
                    }
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

function randomOverAudio() {
    let url = GameOverAudios[Math.floor(Math.random() * GameOverAudios.length)]
    if (!url) {
        url = GameOverAudios[0]
    }
    const audio = new Audio(url)
    audio.currentTime = 0
    audio.play()
}