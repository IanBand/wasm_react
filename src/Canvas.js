// src/canvas.js
import React, { Component } from "react";



class Canvas extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        //scaler
        let canvas = this.canvasRef.current.getContext('2d');
        
        let maxIter = 3;
        let maxSize = 2000;

        for (let x = 0; x < this.props.height; x++)  {
            for (let y = 0; y < this.props.width; y++)  {
              let m = mandelbrotPointTester(x, y, maxIter, maxSize);

              canvas.fillStyle = (m === 0) ? '#000' : 'hsl(0, 100%, ' + m*100 + '%)'; 

              canvas.fillRect(x, y, 1,1);//square starting at x,y and extending right and down 1 px
            }
        }
    }
    render() {
        return (
            <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height} />
        )
    }
}

export default Canvas;


const mandelbrotPointTester = (x, y, maxIterations, maxSize) => {//max size is the square of the upper bound

    //Z starts at 0
    let real = 0;
    let imag = 0;

    for(let i = 0; i < maxIterations; i++){
        // Znext = z^2 + C
        // Znext = (r + i)(r + i) + C
        // Znext = r^2 + 2ir + i^2 + C
        // Znext = r^2 + 2ir - i^2 + ( iy + x )

        real = real * real - imag * imag + x; // real component of Znext
        imag = 2 * imag * real + y; //imaginary component of Znext

        if(real * imag > maxSize){
            return i/maxIterations;
        }
    }
    return 0;
}