<template>
        <canvas id="anime-poconi" class="anime-background__global">

        </canvas>
</template>

<script>
        import * as THREE from 'three'

        export default {
        name: "AnimeBackground",
            mounted() {

                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

                    let canvas = document.querySelector('#anime-poconi');
                    const renderer = new THREE.WebGLRenderer({canvas,
                            alpha: true,});
                    renderer.setSize( window.innerWidth, window.innerHeight );

                    function createTriangle(startCoords, vectors) {
                            const shape = new THREE.Shape();
                            const x = startCoords[0];
                            const y = startCoords[1];

                            shape.moveTo(x + vectors[0], y + vectors[1]);
                            shape.lineTo(x + vectors[2], y + vectors[3]);
                            shape.lineTo(x + vectors[4], y + vectors[5]);

                            const geom = new THREE.ShapeGeometry(shape);
                            return new THREE.Mesh(geom, new THREE.MeshNormalMaterial())
                    }

                    let triangles = [];
                    for ( let i = -30; i < 30; i+=10) {
                      for ( let j = -30; j < 30; j+=10 ) {
                        let triangle = createTriangle([i, j], [-5, -5, +5, -5, 0, +5]);
                        triangles.push(triangle);
                        scene.add(triangle)
                      }
                    }

                    camera.position.z = 5;

                    function animate() {
                            requestAnimationFrame( animate );

                            triangles.forEach(triangle => {
                              triangle.rotation.x += 0.01;
                              triangle.rotation.y += 0.01;

                            })

                            renderer.render( scene, camera );
                    }

                    animate();
            }
    }
</script>

<style scoped>
.anime-background__global
{
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    background: rgb(63,94,251);
    background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(210,179,186,1) 100%);
}
iframe {
        z-index : -9999;
        position: fixed;
        top : 0;
        left    : 0;
        width   : 100%;
        height  : 100%;
        margin  : 0;
        padding : 0;
}
</style>
