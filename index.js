window.onload = function() {
	let canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 1000,
		height = canvas.height = 600,
		fl = 6500,
		points = [],
		needsUpdate = true,
		centerZ = 1500;

    context.translate(width / 2, height / 2);

	// верхнее основание
	points[0] = { x: 20, y: -100, z: 0 };
	points[1] = { x:  60, y: -100, z: -50 };
	points[2] = { x:  120, y: -100, z: -50 };
	points[3] = { x: 160, y: -100, z: 0 };
	points[4] = { x: 120, y: -100, z: 50 };
	points[5] = { x:  60, y: -100, z: 50 };
			
	//нижнее основание
	points[6] = { x: 120, y: 10, z: -30 };
	points[7] = { x: 90, y: 10, z: 20 };
	points[8] = { x: 60, y: 10, z: -30 };

    function resetPoints() {
	    // верхнее основание
		points[0] = { x: 20, y: -100, z: 0 };
		points[1] = { x:  60, y: -100, z: -50 };
		points[2] = { x:  120, y: -100, z: -50 };
		points[3] = { x: 160, y: -100, z: 0 };
		points[4] = { x: 120, y: -100, z: 50 };
		points[5] = { x:  60, y: -100, z: 50 };
			
		//нижнее основание
		points[6] = { x: 120, y: 10, z: -30 };
		points[7] = { x: 90, y: 10, z: 20 };
		points[8] = { x: 60, y: 10, z: -30 };
    }

	function project() {
		for(let i = 0; i < points.length; i++) {
			let p = points[i],
                scale = fl / (fl + p.z + centerZ);
        
			p.sx = p.x * scale;
			p.sy = p.y * scale;
        }
    }

	function drawLine() {
		let p = points[arguments[0]];
		context.moveTo(p.sx, p.sy);

		for(let i = 1; i < arguments.length; i++) {
			p = points[arguments[i]];
			context.lineTo(p.sx, p.sy);
		}
	}

	function front_view() {
		resetPoints();

		for(let i = 0; i < points.length; i++) {
			points[i].z = 0;
		}

		needsUpdate = true;
	}

	function projection_cabine() {
		resetPoints();

		let a = Math.cos(0.79)/2;
		let b = Math.sin(0.79)/2;

		for(let i = 0; i < points.length; i++) {
			points[i].x = points[i].x + points[i].z*a;
			points[i].y = points[i].y + points[i].z*b;
			points[i].z = 0;
		}

		needsUpdate = true;
	}

	function single_point_central_projection() {
		resetPoints();
		let r = -0.005;

		for(let i = 0; i < points.length; i++) {
			points[i].x = points[i].x / (r*points[i].z + 1);
			points[i].y = points[i].y / (r*points[i].z + 1);
			points[i].z = points[i].z / (r*points[i].z + 1);
		}

		needsUpdate = true;
	}

	this.document.querySelector('#btn-central').addEventListener('mousedown', single_point_central_projection);
	this.document.querySelector('#btn-front').addEventListener('mousedown', front_view);
	this.document.querySelector('#btn-cabine').addEventListener('mousedown', projection_cabine);

	update();

	function update() {
		if(needsUpdate) {
			context.clearRect(-width / 2, -height / 2, width, height);
			project();
			
            context.beginPath();
            drawLine(0, 1, 2, 3, 4, 5, 0);
			drawLine(6, 7, 8, 6);
			drawLine(7, 5);
			drawLine(7, 4);
			drawLine(6, 3);
            drawLine(6, 2);
            drawLine(8, 0);
			drawLine(8, 1);
			context.stroke();
			needsUpdate = false;
		}
		requestAnimationFrame(update);
    }

};