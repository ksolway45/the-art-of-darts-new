namespace SpriteKind {
    export const gas = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, assets.image`Dart1`]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -150)
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite2, 0, -150)
    projectile.startEffect(effects.trail)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, assets.image`Dart1`]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -150)
    projectile.startEffect(effects.disintegrate, 100)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.ashes, 500)
    otherSprite.destroy()
    info.changeScoreBy(1)
})
info.onScore(30, function () {
    info.startCountdown(50)
    mySprite2 = sprites.create(assets.image`Stealth`, SpriteKind.Player)
    mySprite2.follow(mySprite)
    darts = [assets.image`Dart1`, assets.image`Dart2`, assets.image`Dart1`]
})
info.onCountdownEnd(function () {
    sprites.destroy(mySprite2)
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.gameOver(true)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 500)
    otherSprite.destroy()
    info.changeLifeBy(-1)
    if (info.score() == 10) {
        mySprite.sayText("\"+5 lEVEL-Up BONUS!\"", 2000, false)
        info.changeScoreBy(5)
        enemySpeed = 70
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
})
let myEnemy: Sprite = null
let myFuel: Sprite = null
let mySprite2: Sprite = null
let projectile: Sprite = null
let darts: Image[] = []
let enemySpeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
game.splash("kill the enemy")
scroller.scrollBackgroundWithSpeed(0, 10)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(3)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enemySpeed = 50
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.gas)
})
game.onUpdateInterval(5000, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`UFO`, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Flying UFO`,
    200,
    true
    )
})
game.onUpdateInterval(2000, function () {
    myEnemy = sprites.createProjectileFromSide(assets.image`Spider`, 0, 50)
    myEnemy.x = randint(5, 155)
    myEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
