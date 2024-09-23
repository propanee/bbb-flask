document.addEventListener("DOMContentLoaded", function() {
    const imgContainer = document.getElementById('image-container');
    let img = document.getElementById('image');
    const hScroll = document.getElementById('horizontal-scroll');
    const vScroll = document.getElementById('vertical-scroll');

    let posX = 0, posY = 0, scale = 1;
    const ZOOM_SPEED = 0.1;
    const DRAG_SPEED = 0.5;  // 降低拖动速度的因子


    // // 更新滚动条最大值
    // function updateScrollRanges() {
    //     hScroll.max = Math.max(0, img.width * scale - imgContainer.offsetWidth);
    //     vScroll.max = Math.max(0, img.height * scale - imgContainer.offsetHeight);
    // }

    // // 滚动条控制图片位置
    // hScroll.addEventListener('input', function() {
    //     posX = -parseInt(hScroll.value);
    //     updateTransform();
    // });

    // vScroll.addEventListener('input', function() {
    //     posY = -parseInt(vScroll.value);
    //     updateTransform();
    // });

    if (img) {
        img.onmousedown = function(e) {
            e.preventDefault();
            let startX = e.clientX;
            let startY = e.clientY;
            let drag = true;

            function onMouseMove(e) {
                if (drag) {
                    const dx = (e.clientX - startX) * DRAG_SPEED;
                    const dy = (e.clientY - startY) * DRAG_SPEED;
                    startX = e.clientX;
                    startY = e.clientY;
                    posX += dx;
                    posY += dy;
                    updateTransform();
                }
            }

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                // document.onmouseup = null;
                drag = false;
            };
        };

        imgContainer.onwheel = function(e) {
            e.preventDefault();
            const direction = e.deltaY < 0 ? 1 : -1;
            scale += direction * ZOOM_SPEED;
            scale = Math.max(scale, 0.1); // prevent scale too small
            updateTransform();
        };

        function updateTransform() {
            // Constrain the movement within the container
            let maxX = imgContainer.offsetWidth - img.offsetWidth * scale;
            let maxY = imgContainer.offsetHeight - img.offsetHeight * scale;
            // 限制图片移动，防止其移出容器边界
            let newX = Math.min(Math.max(posX, 0), maxX > 0 ? maxX : 0);
            let newY = Math.min(Math.max(posY, 0), maxY > 0 ? maxY : 0);

            img.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        }
        
    }

    // // 更新滚动条位置
    // function updateScrollBars() {
    //     hScroll.value = -posX;
    //     vScroll.value = -posY;
    // }
    // updateScrollRanges(); // 初始化滚动条
});