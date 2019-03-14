// src/canvas.js
import React, { Component } from "react";


const maxIter = 100;
const maxSize = 100;
const mag = 150;
const offset_x = 2.0;
const offset_y = 1.5;

class Canvas extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
    }
    componentDidMount() {
        //scaler
        let canvas = this.canvasRef.current.getContext('2d');
        
        for (let x = 0; x < this.props.height; x++)  {
            for (let y = 0; y < this.props.width; y++)  {
                
                let norm_x = x/mag - offset_x;

                let norm_y = y/mag - offset_y;




                let m = mandelbrotPointTester(norm_x, norm_y, maxIter, maxSize);

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


const mandelbrotPointTester = (x, y, maxIterations, max_Size) => {//max size is the square of the upper bound

    //Z starts at 0
    let real = 0;
    let imag = 0;

    for(let i = 0; i < maxIterations; i++){
        // Znext = z^2 + C
        // Znext = (r + i)(r + i) + C
        // Znext = r^2 + 2ir + i^2 + C
        // Znext = r^2 + 2ir - i^2 + ( iy + x )


        //real = real * real - imag * imag + x; // real component of Znext... this doesnt work because when imag is computed, it uses the wrong value for real. thats why you need temp
        //imag = 2 * imag * real + y; //imaginary component of Znext
        


        let real_temp = real * real - imag * imag + x; // real component of Znext
        let imag_temp = 2 * imag * real + y; //imaginary component of Znext

        real = real_temp;
        imag = imag_temp;

        if(real * imag > max_Size){
            return i/maxIterations;
        }
    }
    return 0;
}