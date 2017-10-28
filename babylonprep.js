      	window.onload = init ;


	function init(){

        	// =============================================
	      	// Création de la structure principale graphique
	      	// =============================================

	      	var canvas = document.getElementById("canvas") ; 
	      	var engine = new BABYLON.Engine(canvas,true) ; 

	      	var scene = createScene(engine) ;
	      	var scene = createPieces(engine);

		scene.debugLayer.show() ; 

		scene.activeCamera.attachControl(canvas) ;   


	      	// ====================
	      	// Callback d'affichage
	      	// ====================
	      	engine.runRenderLoop(function(){scene.render();}) ; 

	      	// ======================
	      	// Callback de retaillage
	      	// ======================
	      	window.addEventListener("resize", function (){engine.resize();});
	}



	function createCamera(scene){
		return new BABYLON.FreeCamera("cam",new BABYLON.Vector3(5,2,30), scene) ; 
	}

	function createLight(scene){

		var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
		light0.diffuse = new BABYLON.Color3(1, 1, 1);
		light0.specular = new BABYLON.Color3(1, 1, 1);
		light0.groundColor = new BABYLON.Color3(0, 0, 0);

		return light0 ; 
	}

	
	function createGround(size,scene){
		return new BA}



	function createCamera4Movement(scene){
		return new BABYLON.FreeCamera("cam",new BABYLON.Vector3(5,2,30), scene) ; 

	}


	function createLight(scene){

		var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
		light0.diffuse = new BABYLON.Color3(1, 1, 1);
		light0.specular = new BABYLON.Color3(1, 1, 1);
		light0.groundColor = new BABYLON.Color3(0, 0, 0);

		return light0 ; 
BYLON.Mesh.CreateGround("floor",size,size,1,scene,false) ; 
	}

