function fixCarouselHeight(){
    let images = document.querySelectorAll(".carousel-image");
    images = Array.from(images);
    let maxheight = 0;


    console.log(images);
    for(i of images){
        console.log(i.clientHeight, "TEST");
        if(i.clientHeight > maxheight){
            // maxheight = i.height;

        }
    }
    document.documentElement.style.setProperty('--imageHeight', maxheight + "px");
    alert(maxheight);
}

setTimeout(fixCarouselHeight, 5000);
