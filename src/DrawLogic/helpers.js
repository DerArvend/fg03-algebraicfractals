export const getDistance = (p1, p2) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

export const drawPixel = (imageData, rgb, i, j, width) => {
    let {r, g, b} = rgb;
    imageData.data[4 * (i + width * j)] = r;
    imageData.data[4 * (i + width * j) + 1] = g;
    imageData.data[4 * (i + width * j) + 2] = b;
    imageData.data[4 * (i + width * j) + 3] = 255;
};

export const getComplexPoint = (i, j, complexBorders, width, height) => {
    return {
        x: i * (complexBorders.right - complexBorders.left) / (width - 1) + complexBorders.left,
        y: -j * (complexBorders.bottom - complexBorders.top) / (height - 1) + complexBorders.top
    }
};

export const enableScaling = (canvas, complexBorders, redraw) => {
    canvas.addEventListener("mousewheel", e => {
        e = e || window.event;
        let c = 0.66;
        if (e.deltaY > 0) c = 1.33;
        for (let key in complexBorders){
            complexBorders[key] *= c;
        }
        redraw();
    });
    canvas.addEventListener("click", e => {
        let shiftX =  (complexBorders.right - complexBorders.left) * (e.offsetX / canvas.width - 0.5);
        let shiftY =  (complexBorders.top - complexBorders.bottom) * (e.offsetY / canvas.height - 0.5);
        complexBorders.right += shiftX;
        complexBorders.left += shiftX;
        complexBorders.top += shiftY;
        complexBorders.bottom += shiftY;
        redraw();
    })
};