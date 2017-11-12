
        function createScene(engine){

		var scene = new BABYLON.Scene(engine,true) ; 
  
		var camera = createCamera(scene) ; 

		var light = createLight(scene) ; 


		var sph = BABYLON.Mesh.CreateSphere("sph",16,1,scene) ; 
		sph.position = new BABYLON.Vector3(5,5,0) ; 

		var torus = BABYLON.Mesh.CreateTorus("torus", 100, 1, 100, scene, false, BABYLON.Mesh.DEFAULTSIDE);
		torus.position = new BABYLON.Vector3(1,1,10) ; 

		var box = BABYLON.Mesh.CreateBox("box", 6.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
		box.position = new BABYLON.Vector3(10,25,0) ; 
	      
		for(var i=0; i < 9; i++){
			var sph = BABYLON.Mesh.CreateSphere("sph"+i,16,2,scene) ; 
			var x = 50*(0.5-Math.random()) ;
			var y = 10*(0.5-Math.random())+2 ; 
			var z = 50*(0.5-Math.random()) ; 
			sph.position = new BABYLON.Vector3(x,y,z); 
		}
		return scene ;

        }

	function createPieces(engine){

		var scene = new BABYLON.Scene(engine,true) ; 
		scene.gravity = new BABYLON.Vector3(0, -0.5, 0);		
  		scene.collisionsEnabled = true;

		var camera = createCamera(scene) ;
		camera.applyGravity = true;
		camera.ellipsoid = new BABYLON.Vector3(1.3, 1.5, 1.3);
		camera.speed = 0.75
		camera.checkCollisions = true;

		var light = createLight(scene) ; 
		var size = 30;
		var epaisseur_mur = 0.5
		
		//sol
		createSol(scene,size*2);		
		//hall
		var hall = createHall(scene, camera, size,size/2,size/6,epaisseur_mur);
		//salle1
		var salle1 = createPiece(scene, camera,size/2,size/3,size/6,epaisseur_mur);
		salle1.rotation.y  =  3*( Math.PI/2);
		salle1.position.x = size/2+epaisseur_mur/2;
		//salle2
		var salle2 = createPiece(scene, camera,size/2,size/3,size/6,epaisseur_mur);
		salle2.rotation.y  =  3*( Math.PI/2);
		salle2.position.x = 15+epaisseur_mur/2;
		salle2.position.z = size/3;
		//salle3
		var salle3 = createPiece(scene, camera,size/2,size/3,size/6,epaisseur_mur);
		salle3.rotation.y  = 3*( Math.PI/2);
		salle3.position.x = size/2+epaisseur_mur/2;
		salle3.position.z = -size/3;
		
		//def of stairs
		var stairs = createStair(scene, size/5-1,0.3, size/6 );
		stairs.rotation.y  = 2*( Math.PI/2);
		stairs.position.x = 7.5;
		stairs.position.z = -12.75;

		//Def of Mezzanine
		var mezzanine = createMezzanine(scene,camera, size,size/2,3,epaisseur_mur);
		mezzanine.position.x = 15+epaisseur_mur/2;
		mezzanine.position.y = 5.01;

		//def of elevator
		var elevator = create_ascensor(scene, size/10, size*0.3, epaisseur_mur);
		elevator.position =  new BABYLON.Vector3(size/4 - size/10 - epaisseur_mur - 0.1,0, size/2 -size/10 - epaisseur_mur - 0.1) ; 
		
		var light1 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(11.5,3.4,10.75), new BABYLON.Vector3(0, 0, 1), -Math.PI/6, 2, scene);
		var light2 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(18.25,3.4,12.5), new BABYLON.Vector3(1, 0, 0), -Math.PI/6, 2, scene);
		var light3 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(11.5,3.4,1), new BABYLON.Vector3(0, 0, 1), -Math.PI/6, 2, scene);
		var light4 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(18.25,3.4,2.5), new BABYLON.Vector3(1, 0, 0), -Math.PI/6, 2, scene);
		var light5 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(11.5,3.4,-9.5), new BABYLON.Vector3(0, 0, 1), -Math.PI/6, 2, scene);
		var light6 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(18.25,3.4,-12.5), new BABYLON.Vector3(1, 0, 0), -Math.PI/6, 2, scene);

		light2.intensity = light1.intensity = light3.intensity = light4.intensity = light5.intensity = light6.intensity = 0.4;
		light1.range = light2.range = light3.range = light4.range = light5.range = light6.range =  10;
		setInterval(function(){
		    if(camera.position.x> 8 && camera.position.z> 9){
			light1.setEnabled(true);
			light2.setEnabled(true);
			light3.setEnabled(false);
			light4.setEnabled(false);
			light5.setEnabled(false);
			light6.setEnabled(false);

		    }
		    else if (camera.position.x> 8 && (camera.position.z< 2 && camera.position.z> -2 )){
			light1.setEnabled(false);
			light2.setEnabled(false);
			light3.setEnabled(true);
			light4.setEnabled(true);
			light5.setEnabled(false);
			light6.setEnabled(false);
		    }
		    else if (camera.position.x> 8 && camera.position.z< -6 ){
			light1.setEnabled(false);
			light2.setEnabled(false);
			light3.setEnabled(false);
			light4.setEnabled(false);
			light5.setEnabled(true);
			light6.setEnabled(true);
		    }
		    else if (camera.position.x< 8){
			light1.setEnabled(false);
			light2.setEnabled(false);
			light3.setEnabled(false);
			light4.setEnabled(false);
			light5.setEnabled(false);
			light6.setEnabled(false);
		    }
		},1000)
	
		sph = create_white_sphere(scene, size/60,camera,0, 0 , "sfg");
		sph1 = create_white_sphere(scene, size/60,camera,8, 0, "sfgo" );
		sph2 = create_white_sphere(scene, size/60,camera,8, 10, "toto" );

    // visite virtuelle du musée
		anima_cam(scene,camera, size);
		
		return scene ;
}

        function createStair(scene,longueurMarche, hauteur, distMur){

		var myparent= new BABYLON.Mesh.CreateBox("parent", 1, scene);
		myparent.isVisible = false;

		var matStairs = new BABYLON.StandardMaterial("materiau_1",scene); 
		matStairs.diffuseTexture=new BABYLON.Texture("assets/textures/paves.png",scene);

		for(var i=0; i < 16; i++){
			distMur = distMur- 0.3;

			var step = BABYLON.MeshBuilder.CreateBox("step", {height: hauteur,width:distMur-0.3}, scene);
			step.position.y = hauteur/2 + hauteur*i;
			step.position.x = distMur/2;
			step.scaling.z = 3
			step.material = matStairs;
			step.parent = myparent;
			step.checkCollisions = true;
		}
		return myparent ;
    }


	function createSol(scene,size){
		var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
		myparent.isVisible = false;

		var matMezzanine = new BABYLON.StandardMaterial("materiau_1",scene); 
		matMezzanine.diffuseTexture=new BABYLON.Texture("assets/textures/jwindark.jpg",scene);

		var sol = BABYLON.Mesh.CreatePlane("ground", size, scene);
		sol.rotation.x  =   Math.PI/2;
		sol.material = matMezzanine;
		sol.checkCollisions = true;

 		sol.parent = myparent;
 		return myparent;
 	}

 		function createMezzanine(scene, camera, longueur, largeur, hauteur, epaisseur_mur){
		var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
		myparent.isVisible = false;

		var matMezzanine = new BABYLON.StandardMaterial("materiau_1",scene); 
		matMezzanine.diffuseTexture=new BABYLON.Texture("assets/textures/Wood_Bamboo_Dark.jpg",scene);

		var sol = BABYLON.MeshBuilder.CreateBox("murGauche", {height: longueur,width:largeur, depth: 0.01 }, scene);
		sol.rotation.x  =   Math.PI/2;
		// sol.position.y = epaisseur_mur/2;
		sol.checkCollisions = true;
		sol.material = matMezzanine;

		var mat1 = new BABYLON.StandardMaterial("mat1", scene);
 		mat1.diffuseTexture = new BABYLON.Texture("assets/textures/dante.jpg", scene);
		mat1.specularPower =3;

		var murGauche = BABYLON.MeshBuilder.CreateBox("murGauche", {height: hauteur,width:largeur, depth: epaisseur_mur }, scene);
		murGauche.position.y = hauteur/2;
		murGauche.position.z = longueur/2 -epaisseur_mur/2;;
		murGauche.parent = myparent;
		murGauche.material = mat1;
		murGauche.checkCollisions = true;

		var murDroite = BABYLON.MeshBuilder.CreateBox("murDroite", {height: hauteur,width:largeur, depth: epaisseur_mur }, scene);
		murDroite.position.y = hauteur/2;
		murDroite.position.z = -longueur/2 + epaisseur_mur/2;
		murDroite.parent = myparent;
		murDroite.material = mat1;
		murDroite.checkCollisions = true;


		var murFond = BABYLON.MeshBuilder.CreateBox("murFond", {height: hauteur,width:longueur, depth: epaisseur_mur }, scene);
		murFond.rotation.y  =   Math.PI/2;
		murFond.position.y = hauteur/2;
		murFond.position.x = largeur/2;
		murFond.parent = myparent;
		murFond.material = mat1;
		murFond.checkCollisions = true;

		var mat_tableau = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau.diffuseTexture=new BABYLON.Texture("assets/textures/tableau_meme2.jpg",scene);

		var tab2 = createTableau(scene,1, mat_tableau);
		tab2.parent = myparent;
		tab2.rotation.y = 2*(Math.PI/2);
		tab2.position.y = hauteur/2 + hauteur/5;
		tab2.position.x = -(largeur/4) ;		
		tab2.position.z = -longueur/2 + epaisseur_mur+0.01;	
		go_to_painting(scene, camera, tab2, -(largeur/4) , hauteur/2 + hauteur/5, -longueur/2 + epaisseur_mur+0.01, 0);

		var tab1 =  createTableau(scene,1, mat_tableau);
		tab1.parent = myparent;
		tab1.rotation.y = 2*(Math.PI/2);
		tab1.position.y = hauteur/2 + hauteur/5;
		tab1.position.x = largeur/4 ;		
		tab1.position.z = -longueur/2 + epaisseur_mur +0.01;	

		var tab3 =  createTableau(scene,1, mat_tableau);
		tab3.parent = myparent;
		tab3.position.y = hauteur/2 + hauteur/5;
		tab3.position.x = -(largeur/4) ;		
		tab3.position.z = longueur/2 - epaisseur_mur - 0.01;		

		var tab4 =  createTableau(scene,1, mat_tableau);
		tab4.parent = myparent;
		tab4.position.y = hauteur/2 + hauteur/5;
		tab4.position.x = largeur/4 ;		
		tab4.position.z = longueur/2 - epaisseur_mur -0.01;			

		var tab5 = createTableau(scene,1, mat_tableau);
		tab5.parent = myparent;
		tab5.rotation.y = (Math.PI/2);
		tab5.position.y = hauteur/2 + hauteur/4;
		tab5.position.x = largeur/2 - epaisseur_mur -0.01;			
		tab5.position.z = longueur/3;			

		var tab6 = createTableau(scene,1, mat_tableau);
		tab6.parent = myparent;
		tab6.rotation.y = (Math.PI/2);
		tab6.position.y = hauteur/2 + hauteur/4;
		tab6.position.x = largeur/2 - epaisseur_mur -0.01;			
		tab6.position.z = longueur/7;	


		var tab7 =  createTableau(scene,1, mat_tableau);
		tab7.parent = myparent;
		tab7.rotation.y = (Math.PI/2);
		tab7.position.y = hauteur/2 + hauteur/5;
		tab7.position.x = largeur/2 - epaisseur_mur -0.01;	
		tab7.position.z = -longueur/3;			
	

		var tab8 =  createTableau(scene,1, mat_tableau);
		tab8.parent = myparent;
		tab8.rotation.y = (Math.PI/2);
		tab8.position.y = hauteur/2 + hauteur/4;
		tab8.position.x = largeur/2 - epaisseur_mur -0.10;			
		tab8.position.z = -longueur/7;	

		var sculpture = createSculture(scene,1)	;
		sculpture.parent = myparent;

		var bench = createBench(scene, largeur*0.08, hauteur*0.25, largeur*0.15);
		bench.parent = myparent;
		bench. rotation.y = Math.PI/3
		bench.position = new BABYLON.Vector3(1,0,-2) ; 

		var bench = createBench(scene, largeur*0.08, hauteur*0.25, largeur*0.15);
		bench.parent = myparent;
		bench. rotation.y = -Math.PI/3
		bench.position = new BABYLON.Vector3(1,0,2) ; 

		var mat_sign = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_sign.diffuseTexture=new BABYLON.Texture("assets/textures/pancarte_mezzanine.png",scene);
		var sign = createSign(scene, hauteur/2, largeur/9, mat_sign);
		sign.position = new BABYLON.Vector3(largeur/2-1,hauteur/4,-longueur/2+1) ;
		sign.rotation.y =3*Math.PI/4; 
		sign.parent = myparent;		


 		sol.parent = myparent;
 		return myparent;
 	}


        function createPiece(scene, camera,longueur, largeur, hauteur, epaisseur_mur){

		var myparent= new BABYLON.Mesh.CreateBox("parent", 1, scene);
		myparent.isVisible = false;


		var mat1 = new BABYLON.StandardMaterial("mat_murs",scene); 
/*		mat1.diffuseTexture=new BABYLON.Texture("assets/textures/ceilling.jpg",scene);*/
		mat1.diffuseColor = new BABYLON.Color3(0.3,0.3,0.3);
		mat1.specularColor = new BABYLON.Color3(0.2,0.2,0.2);
		mat1.specularPower =3;

		var murFond1 = BABYLON.MeshBuilder.CreateBox("murFond1", {height: hauteur,width:largeur/2 -largeur/6, depth: epaisseur_mur }, scene);
		murFond1.position.y = hauteur/2;
		murFond1.position.z = longueur/2;
		murFond1.position.x = -largeur/2 + largeur/5;
		murFond1.parent = myparent;
		murFond1.material = mat1;
		murFond1.checkCollisions = true;


		var murFond2 = BABYLON.MeshBuilder.CreateBox("murFond2", {height: hauteur,width:largeur/2 -largeur/6, depth: epaisseur_mur }, scene);
		murFond2.position.y = hauteur/2;
		murFond2.position.z = longueur/2;
		murFond2.position.x = largeur/2 - largeur/5;
		murFond2.parent = myparent;
		murFond2.material = mat1;
		murFond2.checkCollisions = true;


		var murPorte = BABYLON.MeshBuilder.CreateBox("murPorte", {height: hauteur/4,width:6, depth: epaisseur_mur }, scene);
		murPorte.position.y = hauteur-(hauteur/8);
		murPorte.position.z = longueur/2;
		murPorte.parent = myparent;
		murPorte.material = mat1;
		murPorte.checkCollisions = true;


		var murDerriere = BABYLON.MeshBuilder.CreateBox("murDerriere", {height: hauteur,width:largeur, depth: epaisseur_mur }, scene);
		murDerriere.position.y = hauteur/2;
		murDerriere.position.z = -longueur/2 ;
		murDerriere.parent = myparent;
		murDerriere.material = mat1;
		murDerriere.checkCollisions = true;

		var mat_tableau = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau.diffuseTexture=new BABYLON.Texture("assets/textures/surf.jpg",scene);
		var mat_tableau1 = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau1.diffuseTexture=new BABYLON.Texture("assets/textures/brest.jpg",scene);
		var mat_tableau2 = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau2.diffuseTexture=new BABYLON.Texture("assets/textures/falaise.jpg",scene);
		var mat_tableau3 = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau3.diffuseTexture=new BABYLON.Texture("assets/textures/chat.jpg",scene);
		
		var tab2 = createTableau(scene,1.5, mat_tableau);
		tab2.parent = myparent;
		tab2.rotation.y = 2*(Math.PI/2);
		tab2.position.y = hauteur/2 + hauteur/5;
		tab2.position.x = -(largeur/4) ;		
		tab2.position.z = -longueur/2 + epaisseur_mur;		

		var tab1 = createTableau(scene,1.5, mat_tableau1);
		tab1.parent = myparent;
		tab1.rotation.y = 2*(Math.PI/2);
		tab1.position.y = hauteur/2 + hauteur/5;
		tab1.position.x = largeur/4 ;		
		tab1.position.z = -longueur/2 + epaisseur_mur;			

		var murDroite = BABYLON.MeshBuilder.CreateBox("murDroite", {height: hauteur,width:longueur +epaisseur_mur, depth: epaisseur_mur }, scene);
		murDroite.rotation.y  =   Math.PI/2;		
		murDroite.position.y = hauteur/2;
		murDroite.position.x = largeur/2- epaisseur_mur/2;
		murDroite.parent = myparent;
		murDroite.material = mat1;
		murDroite.checkCollisions = true;

		var tab3 = createTableau(scene,1.5, mat_tableau2);
		tab3.parent = myparent;
		tab3.rotation.y = 3*(Math.PI/2);
		tab3.position.y = hauteur/2 + hauteur/5;
		tab3.position.x = -largeur/2 + epaisseur_mur +0.01;			
		tab3.position.z = longueur/4;	

	
		var tab4 = createTableau(scene,1.5, mat_tableau3);
		tab4.parent = myparent;
		tab4.rotation.y = 3*(Math.PI/2);
		tab4.position.y = hauteur/2 + hauteur/5;
		tab4.position.x = -largeur/2 + epaisseur_mur +0.01;		

		var tab5 = createTableau(scene,1.5, mat_tableau);
		tab5.parent = myparent;
		tab5.rotation.y = 3*(Math.PI/2);
		tab5.position.y = hauteur/2 + hauteur/5;
		tab5.position.x = -largeur/2 + epaisseur_mur +0.01;			
		tab5.position.z = -longueur/4;	


		var murGauche = BABYLON.MeshBuilder.CreateBox("murGauche", {height: hauteur,width:longueur + epaisseur_mur, depth: epaisseur_mur }, scene);
		murGauche.rotation.y  =   Math.PI/2;		
		murGauche.position.y = hauteur/2;
		murGauche.position.x = -largeur/2+ epaisseur_mur /2;
		murGauche.parent = myparent;
		murGauche.material = mat1;
		murGauche.checkCollisions = true;

		var tab6 = createTableau(scene,1.5, mat_tableau2);
		tab6.parent = myparent;
		tab6.rotation.y = (Math.PI/2);
		tab6.position.y = hauteur/2 + hauteur/5;
		tab6.position.x = largeur/2 - epaisseur_mur -0.01;			
		tab6.position.z = longueur/4;	

	
		var tab7 = createTableau(scene,1.5, mat_tableau1);
		tab7.parent = myparent;
		tab7.rotation.y = (Math.PI/2);
		tab7.position.y = hauteur/2 + hauteur/5;
		tab7.position.x = largeur/2 - epaisseur_mur -0.01;		

		var tab8 = createTableau(scene,1.5, mat_tableau3);
		tab8.parent = myparent;
		tab8.rotation.y = (Math.PI/2);
		tab8.position.y = hauteur/2 + hauteur/5;
		tab8.position.x = largeur/2 - epaisseur_mur -0.01;			
		tab8.position.z = -longueur/4;

		var mat_sign = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_sign.diffuseTexture=new BABYLON.Texture("assets/textures/pancarte_salle1.png",scene);
		var sign = createSign(scene, hauteur/2, largeur/9, mat_sign);
		sign.position = new BABYLON.Vector3(-largeur/2+1,hauteur/4,longueur/2-1) ;
		sign.parent = myparent;
		sign.rotation.y =-Math.PI/4; 


		return myparent ;
 
        }


        function createHall(scene, camera,longueur, largeur, hauteur, epaisseur_mur){

		var myparent= new BABYLON.Mesh.CreateBox("parent", 1, scene);
		myparent.isVisible = false;

		var mat = new BABYLON.StandardMaterial("materiau_1",scene); 
		mat.diffuseTexture=new BABYLON.Texture("assets/textures/dante.jpg",scene);
		
		var murFond1 = BABYLON.MeshBuilder.CreateBox("murFond1", {height: hauteur,width:largeur/2 -largeur/10, depth: epaisseur_mur }, scene);
		murFond1.position.y = hauteur/2;
		murFond1.position.z = longueur/2 -epaisseur_mur/2;
		murFond1.position.x = -largeur/2 + largeur/5;
		murFond1.parent = myparent;
		murFond1.material = mat;
		murFond1.checkCollisions = true;

		var murFond2 = BABYLON.MeshBuilder.CreateBox("murFond2", {height: hauteur,width:largeur/2 - largeur/10, depth: epaisseur_mur }, scene);
		murFond2.position.y = hauteur/2;
		murFond2.position.z = longueur/2 -epaisseur_mur/2;
		murFond2.position.x = largeur/2 - largeur/5;
		murFond2.parent = myparent;
		murFond2.material = mat;
		murFond2.checkCollisions = true;

		var murPorte = BABYLON.MeshBuilder.CreateBox("murPorte", {height: hauteur/4,width:3, depth: epaisseur_mur }, scene);
		murPorte.position.y = hauteur-(hauteur/8);
		murPorte.position.z = longueur/2 -epaisseur_mur/2;
		murPorte.parent = myparent;
		murPorte.material = mat;
		murPorte.checkCollisions = true;

		var murDevant = BABYLON.MeshBuilder.CreateBox("murDevant", {height: hauteur,width:largeur, depth: epaisseur_mur }, scene);
		murDevant.position.y = hauteur/2;
		murDevant.position.z = -longueur/2 +epaisseur_mur/2;
		murDevant.parent = myparent;
		murDevant.material = mat;
		murDevant.checkCollisions = true;


		var mat_tableau = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau.diffuseTexture=new BABYLON.Texture("assets/textures/Leonardo-Dicaprio-Cheers.jpg",scene);
		var mat_tableau1 = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau1.diffuseTexture=new BABYLON.Texture("assets/textures/campagne.jpg",scene);
		var mat_tableau2 = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau2.diffuseTexture=new BABYLON.Texture("assets/textures/shaker.jpg",scene);
		var mat_tableau3 = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_tableau3.diffuseTexture=new BABYLON.Texture("assets/textures/bayonne.jpg",scene);

		var tab2 = createTableau(scene,1.5, mat_tableau);
		tab2.parent = myparent;
		tab2.rotation.y = 2*(Math.PI/2);
		tab2.position.y = hauteur/2 + hauteur/4;
		tab2.position.x = -(largeur/4) ;		
		tab2.position.z = -longueur/2 + epaisseur_mur +0.01;	
		// go_to_painting(scene, camera, tab2,  -(largeur/4) , hauteur/2 + hauteur/4,-longueur/2 + epaisseur_mur +0.01, 0) 
	

		var tab1 = createTableau(scene,1.5, mat_tableau1);
		tab1.parent = myparent;
		tab1.rotation.y = 2*(Math.PI/2);
		tab1.position.y = hauteur/2 + hauteur/4;
		tab1.position.x = largeur/4 ;		
		tab1.position.z = -longueur/2 + epaisseur_mur +0.01;
		// go_to_painting(scene, camera, tab1,  -(largeur/4) , hauteur/2 + hauteur/4,-longueur/2 + epaisseur_mur +0.01, 0) 
		

		var murGauche = BABYLON.MeshBuilder.CreateBox("murGauche", {height: hauteur,width:longueur, depth: epaisseur_mur }, scene);
		murGauche.rotation.y  =   Math.PI/2;		
		murGauche.position.y = hauteur/2;
		murGauche.position.x = -largeur/2;
		murGauche.parent = myparent;
		murGauche.material = mat;
		murGauche.checkCollisions = true;

		var tab3 = createTableau(scene,1.5, mat_tableau2);
		tab3.parent = myparent;
		tab3.rotation.y = 3*(Math.PI/2);
		tab3.position.y = hauteur/2 + hauteur/4;
		tab3.position.x = -largeur/2 + epaisseur_mur +0.01;			
		tab3.position.z = longueur/4;
		// go_to_painting(scene, camera, tab3,  -(largeur/4) , hauteur/2 + hauteur/4,-longueur/2 + epaisseur_mur +0.01, 0) 


		var tab4 = createTableau(scene,1, mat_tableau);
		tab4.parent = myparent;
		tab4.rotation.y = 3*(Math.PI/2);
		tab4.position.y = hauteur/2 + hauteur/5;
		tab4.position.x = -largeur/2 + epaisseur_mur +0.01;	
		// go_to_painting(scene, camera, tab4,  -(largeur/4) , hauteur/2 + hauteur/4,-longueur/2 + epaisseur_mur +0.01, 0) 


		var tab5 = createTableau(scene,1.5, mat_tableau1);
		tab5.parent = myparent;
		tab5.rotation.y = 3*(Math.PI/2);
		tab5.position.y = hauteur/2 + hauteur/4;
		tab5.position.x = -largeur/2 + epaisseur_mur +0.01;			
		tab5.position.z = -longueur/4;
		// go_to_painting(scene, camera, tab5,  -(largeur/4) , hauteur/2 + hauteur/4,-longueur/2 + epaisseur_mur +0.01, 0) 


		var tab6 =createTableau(scene,0.8, mat_tableau3);
		tab6.parent = myparent;
		tab6.position.y = hauteur/2 + hauteur/3;
		tab6.position.z = longueur/2 - epaisseur_mur -0.01;			

		var tab7 = createTableau(scene,1.5, mat_tableau2);
		tab7.parent = myparent;
		tab7.rotation.y = (Math.PI/2);
		tab7.position = new BABYLON.Vector3( largeur/2 - epaisseur_mur -0.01 , hauteur/2 + hauteur/5, longueur/6) ;		

		var tab8 = createTableau(scene,1.5, mat_tableau3);
		tab8.parent = myparent;
		tab8.rotation.y = (Math.PI/2);
		tab8.position = new BABYLON.Vector3(largeur/2 - epaisseur_mur -0.01,hauteur/2 + hauteur/4, -longueur/6) ;

		var mat_sign = new BABYLON.StandardMaterial("mat_tableau",scene); 
		mat_sign.diffuseTexture=new BABYLON.Texture("assets/textures/pancarte_entree.png",scene);
		var sign_hal = createSign(scene, hauteur/2, largeur/9, mat_sign);
		sign_hal.position = new BABYLON.Vector3(-largeur/2+1,hauteur/4,longueur/2-1) ;
		sign_hal.rotation.y =-Math.PI/4; 
		sign_hal.parent = myparent;

		return myparent ;
	}

		function createSculture(scene, size) {

			var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
			myparent.isVisible = false;

			var mat_socle = new BABYLON.StandardMaterial("mat_socle",scene); 
			mat_socle.diffuseTexture=new BABYLON.Texture("assets/textures/Ceramic.jpg",scene);		

			var mat_sculpture = new BABYLON.StandardMaterial("mat_socle",scene); 
			mat_sculpture.diffuseTexture=new BABYLON.Texture("assets/textures/marbre.jpg",scene);		

			var socle = BABYLON.MeshBuilder.CreateBox("door", {height: size,width:size, depth: size }, scene);
			socle.parent = myparent;
			socle.position.y = size/2;
			socle.checkCollisions = true;
			socle.parent = myparent;
			socle.material = mat_socle;

			var sphere = BABYLON.Mesh.CreateSphere("sphere", 10, size*1.5, scene);
			sphere.parent = myparent;
			sphere.position.y = size + size*0.6;
			sphere.material = mat_sculpture;

			var torus = BABYLON.Mesh.CreateTorus("torus", size*1.5, size/3, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
			torus.parent = myparent;
			torus.position.y = 3*size +0.2;
			torus.rotation.x = Math.PI/2
			torus.material = mat_sculpture;

			var animationBox = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);		
			// An array with all animation keys
			var keys = [];

			  keys.push({
			    frame: 0,
			    value:1
			  });

			  keys.push({
			    frame: 50,
			    value: 0
			  });	
			  keys.push({
			    frame: 100,
			    value: 1
			  });
			  animationBox.setKeys(keys);
			  torus.animations = [];
			  torus.animations.push(animationBox);
			  scene.beginAnimation(torus, 0, 100, true);

			return myparent;

		}


		function createTableau(scene,size, mat_tableau){
			var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
			myparent.isVisible = false;

			var tableau = BABYLON.Mesh.CreatePlane("tableau", size, scene);
			tableau.material = mat_tableau;

	 		tableau.parent = myparent;
	 		return myparent;
 		} 		

		function createPorte(scene, largeur, hauteur, epaisseur, angle) {

			var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
			myparent.isVisible = false;

			var mat_porte = new BABYLON.StandardMaterial("mat_porte",scene); 
			mat_porte.diffuseTexture=new BABYLON.Texture("assets/textures/1.jpg",scene);

			var door = BABYLON.MeshBuilder.CreateBox("door", {height: hauteur,width:largeur, depth: epaisseur }, scene);
			door.rotation.y = angle;		
			door.parent = myparent;
			door.material = mat_porte;

	 		return myparent;

		}

		function createBench(scene, largeur, hauteur, longueur) {

			var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
			myparent.isVisible = false;

			var mat_bench = new BABYLON.StandardMaterial("mat_porte",scene); 
			mat_bench.diffuseTexture=new BABYLON.Texture("assets/textures/granit2.jpg",scene);


			for(var i=0; i < 2; i++){
				for(var j =0; j <2; j++){
					var pied = BABYLON.Mesh.CreateCylinder("cylinder", hauteur, 0.2, 0.2, 10, 1, scene);
					pied.position = new BABYLON.Vector3(i,hauteur/2,j) ; 
					pied.parent = myparent;
					pied.material = mat_bench;
					pied.checkCollisions = true;
						
				}
			}

			var sit = BABYLON.MeshBuilder.CreateBox("sit", {height: 0.1,width:largeur, depth: longueur }, scene);
			sit.parent = myparent;
			sit.material = mat_bench;	
			sit.position = new BABYLON.Vector3(0.5,hauteur,0.5) ; 
			sit.checkCollisions = true;


			var dos = BABYLON.MeshBuilder.CreateBox("dos", {height: 0.1,width:largeur*0.75, depth: longueur }, scene);
			dos.rotation.z = Math.PI/3;
			dos.parent = myparent;
			dos.material = mat_bench;	
			dos.position = new BABYLON.Vector3(1.3,hauteur + 0.4,0.5) ; 				
			dos.checkCollisions = true;
	 		return myparent;
	 	}		

	 	function createSign(scene, hauteur, largeur, material){
	 		var myparent= new BABYLON.Mesh.CreatePlane("parent", 1, scene);
			myparent.isVisible = false;
			
			var mat_pied = new BABYLON.StandardMaterial("mat_pied",scene); 
			mat_pied.diffuseTexture=new BABYLON.Texture("assets/textures/granit2.jpg",scene);

			var pied = BABYLON.Mesh.CreateCylinder("cylinder", hauteur, 0.2, 0.2, 10, 1, scene);
			pied.parent = myparent;
			pied.material = mat_pied;
			pied.checkCollisions = true;

			var panneau = BABYLON.MeshBuilder.CreateBox("panneau", {height: hauteur/2,width:largeur, depth: 0.1 }, scene);
			panneau.parent = myparent;
			panneau.material = material;	
			panneau.position = new BABYLON.Vector3(0,hauteur*0.25,-0.1); 
			panneau.checkCollisions = true;

			return myparent;			
	 	}


	 	function create_white_sphere(scene, size,camera, posX, posZ, name){

			var name = BABYLON.Mesh.CreateSphere("sph",20,size,scene) ; 
	 		name.visibility = 0.2;
			name.position = new BABYLON.Vector3(posX,1, posZ);

			go_to_sphere(scene,camera,name,posX, posZ);

	 		return name;
	 	}

	 	function go_to_sphere(scene, camera, sph, posX,posZ) {

	 		sph.actionManager = new BABYLON.ActionManager(scene);
			
			var actionX = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, camera, "position.x", posX, 1000);
			var actionZ = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, camera, "position.z", posZ, 1000);
	 		sph.actionManager.registerAction(new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [actionX, actionZ ]));
	 	}

	 	function go_to_painting(scene, camera, painting, posX, posY, posZ, rotY) {

	 		painting.actionManager = new BABYLON.ActionManager(scene);
			
			var actionX = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, camera, "position.x", posX, 1000);
			var actionZ = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, camera, "position.z", posZ, 1000);
			var actionY = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, camera, "position.y", posY, 1000);
			var actionRot_Y = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.NothingTrigger, camera, "rotation.y", rotY, 1000);
	 		
	 		painting.actionManager.registerAction(new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [actionX, actionY, actionZ, actionRot_Y ]));
	 	}



        function create_ascensor(scene,longueur, hauteur, epaisseur_mur){

			var myparent= new BABYLON.Mesh.CreateBox("parent", 1, scene);
			myparent.isVisible = false;

			var mat1 = new BABYLON.StandardMaterial("mat_pied",scene); 
			mat1.diffuseTexture=new BABYLON.Texture("assets/textures/granit2.jpg",scene);

	
			for(var i=0; i < 2; i++){
				for(var j =0; j <2; j++){
					var pied = BABYLON.Mesh.CreateCylinder("cylinder", hauteur, 0.2, 0.2, 10, 1, scene);
					pied.position = new BABYLON.Vector3(i*longueur,hauteur/2,j*longueur) ; 
					pied.parent = myparent;
					pied.material = mat1;
					pied.checkCollisions = true;
				}
			}

			var box_elevator = create_box_elevator(scene, longueur, hauteur, epaisseur_mur);
			box_elevator.parent = myparent;
			box_elevator.checkCollisions = true;


			var animationBox = new BABYLON.Animation("myAnimation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);		
			// An array with all animation keys
			var keys = [];

			  keys.push({
			    frame: 0,
			    value:0
			  });

			  keys.push({
			    frame: 50,
			    value: 5
			  });	

			  keys.push({
			    frame: 100,
			    value: 5
			  });	
			  keys.push({
			    frame: 150,
			    value: 0
			  });	
			  keys.push({
			    frame: 200,
			    value: 0
			  });	

			  animationBox.setKeys(keys);
			  box_elevator.animations = [];
			  box_elevator.animations.push(animationBox);
			  scene.beginAnimation(box_elevator, 0, 200, true);

			return myparent;
	}

	function create_box_elevator(scene, longueur, hauteur, epaisseur_mur){


			var myparent= new BABYLON.Mesh.CreateBox("parent", 1, scene);
			myparent.isVisible = false;

			var mat_elevator = new BABYLON.StandardMaterial("mat_pied",scene); 
			mat_elevator.diffuseTexture=new  BABYLON.Texture("assets/textures/japan.jpg",scene);

			var side1 = BABYLON.MeshBuilder.CreateBox("panneau", {height: hauteur/2,width:longueur-0.25, depth: 0.1 }, scene);
			side1.parent = myparent;
			side1.material = mat_elevator;	
			side1.position = new BABYLON.Vector3(longueur/2 ,hauteur*0.25, longueur-0.1); 
			side1.checkCollisions = true;

			var side2 = BABYLON.MeshBuilder.CreateBox("panneau", {height: hauteur/2,width:longueur-0.25, depth: 0.1 }, scene);
			side2.parent = myparent;
			side2.material = mat_elevator;	
			side2.position = new BABYLON.Vector3(longueur/2 ,hauteur*0.25, 0); 
			side2.checkCollisions = true;

			var sol = BABYLON.MeshBuilder.CreateBox("panneau", {height: 0.1,width:longueur-0.25, depth: longueur- 0.25 }, scene);
			sol.parent = myparent;
			sol.material = mat_elevator;	
			sol.position = new BABYLON.Vector3(longueur/2 ,0.01, longueur/2-0.1); 
			sol.checkCollisions = true;

			var toit = BABYLON.MeshBuilder.CreateBox("panneau", {height: 0.1,width:longueur-0.25, depth: longueur- 0.25 }, scene);
			toit.parent = myparent;
			toit.material = mat_elevator;	
			toit.position = new BABYLON.Vector3(longueur/2 ,hauteur/2, longueur/2-0.1); 
			toit.checkCollisions = true;

			return myparent;
	}

	function anima_cam(scene,camera_visit, size){

			camera_visit.applyGravity = true;
			camera_visit.ellipsoid = new BABYLON.Vector3(1.3, 1, 1.3);
			camera_visit.checkCollisions = true;
			camera_visit.rotation.y = Math.PI;
			
			var animation_posX = new BABYLON.Animation("myAnimation", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);		
			var animation_posY = new BABYLON.Animation("myAnimation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);		
			var animation_posZ = new BABYLON.Animation("myAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);		
			var animation_rotY = new BABYLON.Animation("myAnimation", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);		

			// key POS_Y
			var keysPosY = [];

			  keysPosY.push({
			    frame: 0,
			    value: 2
			  });		  
			  keysPosY.push({
			    frame: 800,
			    value: 2
			  });		  
			  keysPosY.push({
			    frame: 850,
			    value: 7.5
			  });	
			  keysPosY.push({
			    frame: 1100,
			    value: 7.5
			  });	

//---------------------------------
			// key POS_X
			var keysX = [];

			  keysX.push({
			    frame: 0,
			    value: -1
			  });		  

			  keysX.push({
			    frame: 175,
			    value: -1
			  });		  
			  keysX.push({
			    frame: 400,
			    value: -3
			  });		  

			  keysX.push({
			    frame: 450,
			    value: 12
			  });	
			  keysX.push({
			    frame: 600,
			    value: 12
			  });	

			  keysX.push({
			    frame: 650,
			    value: 0
			  });	
			  keysX.push({
			    frame: 800,
			    value: 0
			  });	
			  keysX.push({
			    frame: 850,
			    value: 10
			  });	
			  keysX.push({
			    frame: 900,
			    value: 15
			  });	
			  keysX.push({
			    frame: 1050,
			    value: 11.5
			  });	
			  keysX.push({
			    frame: 1100,
			    value: 11.5
			  });	
//---------------------------------
			  // key POS_Z
			var keysZ = [];

			  keysZ.push({
			    frame: 0,
			    value: 30
			  });
			  keysZ.push({
			    frame: 100,
			    value: 30
			  });

			  keysZ.push({
			    frame: 150,
			    value: 8
			  });	

			  keysZ.push({
			    frame: 200,
			    value: 9
			  });	
			  keysZ.push({
			    frame: 300,
			    value: 9
			  });				  
			  keysZ.push({
			    frame: 350,
			    value: 0
			  });	
			  keysZ.push({
			    frame: 700,
			    value: 0
			  });	
			  keysZ.push({
			    frame: 750,
			    value: -12
			  });	
			  keysZ.push({
			    frame: 1000,
			    value: -12
			  });	
			  keysZ.push({
			    frame: 1050,
			    value: -4
			  });		
			  keysZ.push({
			    frame: 1100,
			    value: 10
			  });			  		  			  
//---------------------------------
			  // key ROT_Y
			var keysY = [];

			  keysY.push({
			    frame: 0,
			    value: Math.PI
			  });

			  keysY.push({
			    frame: 160,
			    value: Math.PI
			  });

			  keysY.push({
			    frame: 200,
			    value: 7*Math.PI/4
			  });			  
			  keysY.push({
			    frame: 250,
			    value: 7*Math.PI/4
			  });	
			  keysY.push({
			    frame: 300,
			    value: Math.PI
			  });
			  keysY.push({
			    frame: 350,
			    value: Math.PI
			  });
			  keysY.push({
			    frame: 400,
			    value: Math.PI/2
			  });
			  keysY.push({
			    frame: 460,
			    value: Math.PI/2
			  });
			  keysY.push({
			    frame: 500,
			    value: 5*Math.PI/4
			  });
			  keysY.push({
			    frame: 550,
			    value: 5*Math.PI/4
			  });
			  keysY.push({
			    frame: 600,
			    value: 3*Math.PI/2
			  });
			  keysY.push({
			    frame: 650,
			    value: 3*Math.PI/2
			  });
			  keysY.push({
			    frame: 700,
			    value: Math.PI
			  });
			  keysY.push({
			    frame: 750,
			    value: Math.PI
			  });
			  keysY.push({
			    frame: 800,
			    value: Math.PI/2
			  });
			  keysY.push({
			    frame: 950,
			    value: Math.PI/2
			  });
			  keysY.push({
			    frame: 1000,
			    value: 0
			  });
			  keysY.push({
			    frame: 1030,
			    value: 0
			  });
			  keysY.push({
			    frame: 1050,
			    value: Math.PI/4
			  });
			  keysY.push({
			    frame: 1080,
			    value: 3*Math.PI/4
			  });
			  keysY.push({
			    frame: 1100,
			    value: 5*Math.PI/6
			  });
			  keysY.push({
			    frame: 1150,
			    value: 5*Math.PI/3
			  });


			  animation_posX.setKeys(keysX);
  			  animation_posZ.setKeys(keysZ);
  			  animation_posY.setKeys(keysPosY);  			  
  			  animation_rotY.setKeys(keysY);

			  camera_visit.animations = [];

			  camera_visit.animations.push(animation_posX);
			  camera_visit.animations.push(animation_posY);
			  camera_visit.animations.push(animation_rotY);
			  camera_visit.animations.push(animation_posZ);

    // scene.beginAnimation(camera_visit, 0, 1100, false);		
	}

	function check_spot(){

		var light1 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(11.5,3.4,10.75), new BABYLON.Vector3(0, 0, 1), -Math.PI/6, 2, scene);
		var light2 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(18.25,3.4,12.5), new BABYLON.Vector3(1, 0, 0), -Math.PI/6, 2, scene);
		var light3 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(11.5,3.4,1), new BABYLON.Vector3(0, 0, 1), -Math.PI/6, 2, scene);
		var light4 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(18.25,3.4,2.5), new BABYLON.Vector3(1, 0, 0), -Math.PI/6, 2, scene);
		var light5 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(11.5,3.4,-9.5), new BABYLON.Vector3(0, 0, 1), -Math.PI/6, 2, scene);
		var light6 = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(18.25,3.4,-12.5), new BABYLON.Vector3(1, 0, 0), -Math.PI/6, 2, scene);		

		light2.intensity = light1.intensity = light3.intensity = light4.intensity = light5.intensity = light6.intensity = 0.4;
		light1.range = light2.range = light3.range = light4.range = light5.range = light6.range =  10;

	    if(camera.position.x> 8 && camera.position.z> 9){
			light1.setEnabled(true);
			light2.setEnabled(true);
			light3.setEnabled(false);
			light4.setEnabled(false);
			light5.setEnabled(false);
			light6.setEnabled(false);

	    }
	    else if (camera.position.x> 8 && (camera.position.z< 2 && camera.position.z> -2 )){
			light1.setEnabled(false);
			light2.setEnabled(false);
			light3.setEnabled(true);
			light4.setEnabled(true);
			light5.setEnabled(false);
			light6.setEnabled(false);
	    }
	    else if (camera.position.x> 8 && camera.position.z< -6 ){
			light1.setEnabled(false);
			light2.setEnabled(false);
			light3.setEnabled(false);
			light4.setEnabled(false);
			light5.setEnabled(true);
			light6.setEnabled(true);
	    }
	    else if (camera.position.x< 8){
			light1.setEnabled(false);
			light2.setEnabled(false);
			light3.setEnabled(false);
			light4.setEnabled(false);
			light5.setEnabled(false);
			light6.setEnabled(false);
	    }		
	}
			  // scene.beginAnimation(camera_visit, 1200, 1200, false);		
	}


