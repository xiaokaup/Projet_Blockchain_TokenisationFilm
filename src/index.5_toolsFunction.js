var imgs_web = ["assets/img/desk.jpg", "assets/img/building.jpg", "assets/img/loft.jpg", "assets/img/bourdelle.jpg", "assets/img/meeting.jpg", "assets/img/star-sky.jpg"];

function random_img(imgs) {
    return imgs[Math.floor(Math.random() * Math.floor(imgs.length))];
}