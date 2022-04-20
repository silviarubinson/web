class EqualHeightRows {
    
    constructor(rowClass, spacing){
        //Wait until all images finished loading before processing them
        Promise.all(Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))
        )
        .then(() => {
            this.resizeImages();
            // console.log('images have been resized');
        });
        this.heightEqualizingRows = document.querySelectorAll(rowClass);
        this.spacing = spacing;


        window.addEventListener('resize', this.resizeImages);
    }

    resizeImages(){
        console.log(this.heightEqualizingRows);
        for (let row of this.heightEqualizingRows){

            let sumOfRatios = 0;
            const images = row.querySelectorAll('img');
            let paddings = 20*(images.length - 1);
            const children = row.children;

            row.style.display = 'flex';
            row.style.flexWrap = (window.innerWidth > 800) ? 'nowrap' : 'wrap';

            //equalize heights and measure relative widths
            for(let image of images){
                // image.style.height = '1000px';
                let w = image.clientWidth;
                let h = image.clientHeight;
                let aspectRatio = w/h;
                sumOfRatios += aspectRatio;
            }
            
            for(let image of images){
                //Apply styles
                if ( window.innerWidth > 800 ){
                    image.style.width = 'auto';
                    image.style.height =  (row.clientWidth-paddings) * 1 / sumOfRatios + 'px';
                }
                else {
                    image.style.width = '100%';
                    image.style.height = 'auto';
                }
            }

            //Apply paddings
            if( window.innerWidth > 800 ){
                let isFirstItem = true;
                for(let child of children){
                    if( isFirstItem ) { isFirstItem = false ; continue }
                    child.style.paddingLeft = this.spacing ? this.spacing : '20px';
                    child.style.width = '100%';
                }
            }
            else {
                let isFirstItem = true;
                for(let child of children){
                    child.style.paddingLeft = 0;
                    child.style.width = '100%';
                }
            }

            // //Apply styles
            // for(let image of images){
            //     let w = image.clientWidth;
            //     let h = image.clientHeight;
            //     let aspectRatio = w/h;
            //     // image.style.height = image.clientHeight * shrinkingRatio + 'px';
            //     image.style.height =  aspectRatio * row.clientWidth / sumOfWidths + 'px';
            //     image.style.width = 'auto';
            // }

            //calculate shrinking ratio
            // let shrinkingRatio = (row.clientWidth - paddings) / sumOfWidths;
            
            // //re-scale images
            // for(let image of images){
            //     if( window.innerWidth > 800 ){
            //         image.style.height = image.clientHeight * shrinkingRatio + 'px';
            //         image.style.width = 'auto';
            //         //width re-scales automatically
            //     }
            //     else{
            //         image.style.width = '100%';
            //         image.style.height = 'auto';
            //         //height re-scales automatically
            //     }
                
            // }

            // //Apply paddings
            // if( window.innerWidth > 800 ){
            //     let isFirstItem = true;
            //     for(let child of children){
            //         if( isFirstItem ) { isFirstItem = false ; continue }
            //         child.style.paddingLeft = this.spacing ? this.spacing : '20px';
            //     }
            // }
            // else {
            //     let isFirstItem = true;
            //     for(let child of children){
            //         child.style.paddingLeft = 0;
            //     }
            // }
        }
    }
}