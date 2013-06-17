var camera, scene, renderer;
var controls;
var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

function draw(mainW2uiId, topW2uiId, leftW2uiId) {
    init(mainW2uiId, topW2uiId, leftW2uiId);
    animate();
}

function newEl(el) {
    el.appendChild(document.createElement( 'div' ));
}

function action(s) {
    //console.log(s);
    w2ui['layout'].content('bottom', s);
}

function init(mainW2uiId, topW2uiId, leftW2uiId) {

    var border = 1;
    var padding = 5;
    var basicSstyle = 'border: '+border+'px solid #dfdfdf; padding: '+padding+'px;';
    var pstyle     = basicSstyle + 'background-color: #F5F6F7;';
    var mainStyle  = basicSstyle + 'background-color: #000000;'; // this overrides the backgroundColor from the chem. table
    $('#layout').w2layout({
        name: 'layout',
        panels: [
            { type: 'top',  name: 'top', size: 50, resizable: true, style: pstyle },     //, content: 'top'
            { type: 'left', name: 'left', size: 200, resizable: true, style: pstyle },   //, content: 'left'
            { type: 'main', name: 'main', resizable: true, style: mainStyle },           //, content: 'main'
            //{ type: 'preview', size: '50%', resizable: true, style: pstyle, content: 'preview' },
            //{ type: 'right', size: 200, resizable: true, style: pstyle, content: 'right' },
            { type: 'bottom', name: 'bottom', size: 50, resizable: true, style: pstyle } //, content: 'bottom'
        ]
    });

    var contentTop = $().w2toolbar({
        name: 'toolbar',
        items: [
            { type: 'check',  id: 'item1', caption: 'Check', img: 'icon-add', checked: true },
            { type: 'break' },
            { type: 'menu',   id: 'item2', caption: 'Drop Down', img: 'icon-folder', items: [
                    { text: 'Item 1', icon: 'icon-page' },
                    { text: 'Item 2', icon: 'icon-page' },
                    { text: 'Item 3', icon: 'icon-page' }
            ]},
            { type: 'break' },
            { type: 'radio',  id: 'item3',  group: '1', caption: 'Radio 1', img: 'icon-page' },
            { type: 'radio',  id: 'item4',  group: '1', caption: 'Radio 2', img: 'icon-page' },
            { type: 'spacer' },
            { type: 'button',  id: 'item5',  caption: 'Item 5', img: 'icon-save' }
        ]
    });
    w2ui['layout'].content('top', contentTop);

    var contentLeft = $().w2sidebar({
        name: 'sidebar',
        nodes: [
            { id: 'level-1', text: 'Level 1', img: 'icon-folder', expanded: true, group: true,
              nodes: [ { id: 'level-1-1', text: 'Level 1.1', img: 'icon-page' },
                       { id: 'level-1-2', text: 'Level 1.2', img: 'icon-page' },
                       { id: 'level-1-3', text: 'Level 1.3', img: 'icon-page' }
                     ]
            },
            { id: 'level-2', text: 'Level 2', img: 'icon-folder', expanded: true, group: true,
              nodes: [ { id: 'level-2-1', text: 'Level 2.1', img: 'icon-folder', count: 3,
                         nodes: [
                           { id: 'level-2-1-1', text: 'Level 2.1.1', img: 'icon-page' },
                           { id: 'level-2-1-2', text: 'Level 2.1.2', img: 'icon-page', count: 67 },
                           { id: 'level-2-1-3', text: 'Level 2.1.3', img: 'icon-page' }
                     ]},
                       { id: 'level-2-2', text: 'Level 2.2', img: 'icon-page' },
                       { id: 'level-2-3', text: 'Level 2.3', img: 'icon-page' }
                     ]
            }
        ]
    });
    w2ui['layout'].content('left', contentLeft);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.z = 1800;
    scene = new THREE.Scene();

    for ( var i = 0; i < table.length; i ++ ) {
        var item = table[ i ];
        var element = document.createElement( 'div' );
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

        var number = document.createElement( 'div' );
        number.className = 'number';
        number.textContent = i + 1;
        element.appendChild( number );

        var symbol = document.createElement( 'div' );
        symbol.className = 'symbol';
        symbol.textContent = item[ 0 ];
        element.appendChild( symbol );

        var details = document.createElement( 'div' );
        details.className = 'details';
        details.innerHTML = item[ 1 ] + '<br>' + item[ 2 ];
        element.appendChild( details );
        var sAction = "action('"+(item[1]+' '+item[2])+"');";
        element.onmouseover = new Function(sAction);

        var object = new THREE.CSS3DObject( element );
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add( object );

        objects.push( object );
    }

    // table
    for ( var i = 0; i < objects.length; i ++ ) {
        var item = table[ i ];
        var object = new THREE.Object3D();
        object.position.x = ( item[ 3 ] * 160 ) - 1540;
        object.position.y = - ( item[ 4 ] * 200 ) + 1100;
        targets.table.push( object );
    }

    // sphere
    var vector = new THREE.Vector3();
    for ( var i = 0, l = objects.length; i < l; i ++ ) {
        var phi = Math.acos( -1 + ( 2 * i ) / l );
        var theta = Math.sqrt( l * Math.PI ) * phi;
        var object = new THREE.Object3D();
        object.position.x = 1000 * Math.cos( theta ) * Math.sin( phi );
        object.position.y = 1000 * Math.sin( theta ) * Math.sin( phi );
        object.position.z = 1000 * Math.cos( phi );
        vector.copy( object.position ).multiplyScalar( 2 );
        object.lookAt( vector );
        targets.sphere.push( object );
    }

    // helix
    var vector = new THREE.Vector3();
    for ( var i = 0, l = objects.length; i < l; i ++ ) {
        var phi = i * 0.175 + Math.PI;
        var object = new THREE.Object3D();
        object.position.x = 1100 * Math.sin( phi );
        object.position.y = - ( i * 8 ) + 450;
        object.position.z = 1100 * Math.cos( phi );
        vector.copy( object.position );
        vector.x *= 2;
        vector.z *= 2;
        object.lookAt( vector );
        targets.helix.push( object );
    }

    // grid
    for ( var i = 0; i < objects.length; i ++ ) {
        var object = new THREE.Object3D();
        object.position.x = ( ( i % 5 ) * 400 ) - 800;
        object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
        object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
        targets.grid.push( object );
    }

    //
    renderer = new THREE.CSS3DRenderer();
    var mainEl = w2ui['layout'].get('main');
    // TODO the 4*(border + padding) multiplications are strange
    var width = mainEl.width - 4*(border + padding);
    var height = mainEl.height - 2*(border + padding);

    //var winWidth = window.innerWidth;
    //var winHeight = window.innerHeight;
    //console.log('winWidth: '+winWidth+ '; width: '+width+'; winHeight: '+winHeight+'; height: '+height)

    renderer.setSize( width, height );
    renderer.domElement.style.position = 'absolute';
    var mainDomEl = renderer.domElement;
    //var mainW2uiEl = document.getElementById(mainW2uiId);

    var menuContainer = jQuery('<div/>', {
        id: 'menu',
    }).appendTo(mainDomEl);
    ////mainW2uiEl.appendChild(menuContainer);
    w2ui['layout'].content('main', mainDomEl);

    jQuery('<button/>', {
        id: 'table',
        text: 'table'
    }).appendTo(menuContainer);

    jQuery('<button/>', {
        id: 'sphere',
        text: 'sphere'
    }).appendTo(menuContainer);

    jQuery('<button/>', {
        id: 'helix',
        text: 'helix'
    }).appendTo(menuContainer);

    jQuery('<button/>', {
        id: 'grid',
        text: 'grid'
    }).appendTo(menuContainer);

    // var bottomEl = w2ui['layout'].get('bottom');
    // jQuery('<button/>', {
    //     id: 'clr_C0C0C0',
    //     className: 'colorPicker',
    //     text: 'sss'
    // }).appendTo(bottomEl);

    //
    controls = new THREE.TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.5;
    controls.addEventListener( 'change', render );

    var shuffle_timeout = 800;
    // unmixing duration on start up
    var startup_timeout = shuffle_timeout;

    $('#table')[0].addEventListener( 'click', function ( event ) {
        transform( targets.table, shuffle_timeout );
    }, false );

    $('#sphere')[0].addEventListener( 'click', function ( event ) {
        transform( targets.sphere, shuffle_timeout );
    }, false );

    $('#helix')[0].addEventListener( 'click', function ( event ) {
        transform( targets.helix, shuffle_timeout );
    }, false );

    $('#grid')[0].addEventListener( 'click', function ( event ) {
        transform( targets.grid, shuffle_timeout );
    }, false );

    transform( targets.table, startup_timeout );
    window.addEventListener( 'resize', onWindowResize, false );
}

function transform( targets, duration ) {
    TWEEN.removeAll();
    for ( var i = 0; i < objects.length; i ++ ) {
        var object = objects[ i ];
        var target = targets[ i ];

        new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

        new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();
    }

    new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( render )
    .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    TWEEN.update();
    controls.update();
}

function render() {
    renderer.render( scene, camera );
}
