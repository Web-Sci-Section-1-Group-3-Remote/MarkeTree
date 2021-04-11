
function fixCarouselHeight(){
    let images = document.querySelectorAll(".carousel-image");
    images = Array.from(images);
    let maxheight = 0;


    console.log(images);
    for(i of images){
        if(i.height > maxheight){
            maxheight = i.height;
        }
    }
    document.documentElement.style.setProperty('--imageHeight', maxheight + "px");
    alert(maxheight);
}

fixCarouselHeight();