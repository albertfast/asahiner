package com.ahmet;

import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.scene.Group;
import javafx.scene.PerspectiveCamera;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.scene.paint.PhongMaterial;
import javafx.scene.shape.Cylinder;
import javafx.scene.shape.MeshView;
import javafx.scene.shape.Sphere;
import javafx.scene.shape.TriangleMesh;
import javafx.scene.transform.Rotate;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CyberTorusKnot extends Application {
    
    private Group root;
    private Group torusGroup;
    private Group pentagonGroup; // For the cyber cube/pentagon in the top left
    private List<CyberCell> cells = new ArrayList<>();
    private double angleX = 0;
    private double angleY = 0;
    private double angleZ = 0;
    
    private double pAngleX = 0;
    private double pAngleY = 0;
    private double pAngleZ = 0;
    
    private static final int NUM_CELLS = 150;
    private static final double TORUS_RADIUS = 200;
    private static final double TUBE_RADIUS = 60;
    
    @Override
    public void start(Stage primaryStage) {
        root = new Group();
        root.setTranslateX(600);
        root.setTranslateY(400);
        
        // Camera setup
        PerspectiveCamera camera = new PerspectiveCamera(true);
        camera.setTranslateZ(-800);
        camera.setFieldOfView(60);
        
        // Create torus knot structure
        torusGroup = new Group();
        createTorusKnot();
        createCyberCells();
        
        // Create top-left cyber pentagon
        pentagonGroup = new Group();
        createCyberPentagon();
        // Position it at top left (relative to root at center 600,400)
        pentagonGroup.setTranslateX(-450);
        pentagonGroup.setTranslateY(-250);
        pentagonGroup.setTranslateZ(0);
        
        root.getChildren().addAll(torusGroup, pentagonGroup);
        
        Scene scene = new Scene(root, 1200, 800, true);
        scene.setFill(Color.rgb(5, 5, 15));
        scene.setCamera(camera);
        
        primaryStage.setTitle("Cyber Torus Knot & Dodecahedron - Ahmet Sahiner");
        primaryStage.setScene(scene);
        primaryStage.show();
        
        // Animation loop
        new AnimationTimer() {
            @Override
            public void handle(long now) {
                animate();
            }
        }.start();
    }
    
    private void createTorusKnot() {
        // Create wireframe torus knot
        PhongMaterial wireMaterial = new PhongMaterial();
        wireMaterial.setDiffuseColor(Color.rgb(0, 255, 255));
        wireMaterial.setSpecularColor(Color.CYAN);
        wireMaterial.setSpecularPower(30);
        
        // Draw torus knot curves
        for (double t = 0; t < Math.PI * 2 * 10; t += 0.05) {
            double x = calculateTorusKnotX(t);
            double y = calculateTorusKnotY(t);
            double z = calculateTorusKnotZ(t);
            
            Sphere point = new Sphere(2);
            point.setMaterial(wireMaterial);
            point.setTranslateX(x);
            point.setTranslateY(y);
            point.setTranslateZ(z);
            torusGroup.getChildren().add(point);
        }
        
        // Add glowing core
        PhongMaterial coreMaterial = new PhongMaterial();
        coreMaterial.setDiffuseColor(Color.rgb(138, 43, 226));
        
        for (int i = 0; i < 50; i++) {
            double t = (Math.PI * 2 * i) / 50;
            double x = calculateTorusKnotX(t) * 0.3;
            double y = calculateTorusKnotY(t) * 0.3;
            double z = calculateTorusKnotZ(t) * 0.3;
            
            Sphere core = new Sphere(3 + Math.random() * 2);
            core.setMaterial(coreMaterial);
            core.setTranslateX(x);
            core.setTranslateY(y);
            core.setTranslateZ(z);
            torusGroup.getChildren().add(core);
        }
    }
    
    private void createCyberPentagon() {
        // creating a wireframe icosahedron/dodecahedron feel using cylinders and spheres
        PhongMaterial nodeMat = new PhongMaterial();
        nodeMat.setDiffuseColor(Color.rgb(255, 0, 100));
        nodeMat.setSpecularColor(Color.PINK);
        
        PhongMaterial edgeMat = new PhongMaterial();
        edgeMat.setDiffuseColor(Color.rgb(255, 50, 150, 0.6));
        
        double phi = (1.0 + Math.sqrt(5.0)) / 2.0;
        double a = 40.0;
        double b = a / phi;
        double c = a * phi;
        
        double[][] vertices = {
            {0, b, -c}, {0, b, c}, {0, -b, -c}, {0, -b, c},
            {b, c, 0}, {-b, c, 0}, {b, -c, 0}, {-b, -c, 0},
            {c, 0, b}, {c, 0, -b}, {-c, 0, b}, {-c, 0, -b}
        };
        
        List<Sphere> nodes = new ArrayList<>();
        for (double[] v : vertices) {
            Sphere s = new Sphere(4);
            s.setMaterial(nodeMat);
            s.setTranslateX(v[0]);
            s.setTranslateY(v[1]);
            s.setTranslateZ(v[2]);
            pentagonGroup.getChildren().add(s);
            nodes.add(s);
        }
        
        // connect closest nodes
        for (int i = 0; i < vertices.length; i++) {
            for (int j = i + 1; j < vertices.length; j++) {
                double dx = vertices[i][0] - vertices[j][0];
                double dy = vertices[i][1] - vertices[j][1];
                double dz = vertices[i][2] - vertices[j][2];
                double dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                if (dist < a * 2.1) { // threshold to connect adjacent nodes
                    Cylinder edge = createConnection(vertices[i], vertices[j], edgeMat);
                    pentagonGroup.getChildren().add(edge);
                }
            }
        }
        
        // Inner core
        Sphere core = new Sphere(15);
        PhongMaterial coreMat = new PhongMaterial();
        coreMat.setDiffuseColor(Color.rgb(200, 0, 255, 0.8));
        core.setMaterial(coreMat);
        pentagonGroup.getChildren().add(core);
    }
    
    private Cylinder createConnection(double[] p1, double[] p2, PhongMaterial mat) {
        double dx = p2[0] - p1[0];
        double dy = p2[1] - p1[1];
        double dz = p2[2] - p1[2];
        double length = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        Cylinder cylinder = new Cylinder(1.5, length);
        cylinder.setMaterial(mat);
        
        double midX = (p1[0] + p2[0]) / 2;
        double midY = (p1[1] + p2[1]) / 2;
        double midZ = (p1[2] + p2[2]) / 2;
        
        cylinder.setTranslateX(midX);
        cylinder.setTranslateY(midY);
        cylinder.setTranslateZ(midZ);
        
        // rotation logic to align cylinder
        double ax = Math.toDegrees(Math.acos(dy / length));
        double az = Math.toDegrees(Math.atan2(dx, dz));
        
        Rotate rx = new Rotate(-ax, Rotate.X_AXIS);
        Rotate ry = new Rotate(az, Rotate.Y_AXIS);
        cylinder.getTransforms().addAll(ry, rx);
        
        return cylinder;
    }
    
    private void createCyberCells() {
        Random rand = new Random();
        
        for (int i = 0; i < NUM_CELLS; i++) {
            double t = rand.nextDouble() * Math.PI * 2 * 10;
            double angle = rand.nextDouble() * Math.PI * 2;
            
            // Position on torus surface
            double px = calculateTorusKnotX(t) + Math.cos(angle) * TUBE_RADIUS * 0.5;
            double py = calculateTorusKnotY(t) + Math.sin(angle) * TUBE_RADIUS * 0.5;
            double pz = calculateTorusKnotZ(t) + (rand.nextDouble() - 0.5) * 40;
            
            CyberCell cell = new CyberCell(px, py, pz, rand);
            cells.add(cell);
            torusGroup.getChildren().add(cell.sphere);
        }
    }
    
    private double calculateTorusKnotX(double t) {
        return (TORUS_RADIUS + TUBE_RADIUS * Math.cos(3 * t)) * Math.cos(2 * t);
    }
    
    private double calculateTorusKnotY(double t) {
        return (TORUS_RADIUS + TUBE_RADIUS * Math.cos(3 * t)) * Math.sin(2 * t);
    }
    
    private double calculateTorusKnotZ(double t) {
        return TUBE_RADIUS * Math.sin(3 * t);
    }
    
    private void animate() {
        // Smooth rotation for torus
        angleX += 0.005;
        angleY += 0.008;
        angleZ += 0.003;
        
        torusGroup.setRotationAxis(Rotate.Y_AXIS);
        torusGroup.setRotate(angleY * 180 / Math.PI);
        torusGroup.setRotationAxis(Rotate.X_AXIS);
        torusGroup.setRotate(angleX * 180 / Math.PI);
        
        // Smooth rotation for pentagon
        pAngleX -= 0.02;
        pAngleY += 0.015;
        pAngleZ += 0.01;
        
        pentagonGroup.getTransforms().clear();
        pentagonGroup.getTransforms().add(new Rotate(pAngleX, Rotate.X_AXIS));
        pentagonGroup.getTransforms().add(new Rotate(pAngleY, Rotate.Y_AXIS));
        pentagonGroup.getTransforms().add(new Rotate(pAngleZ, Rotate.Z_AXIS));
        
        // Update cells (Game of Life logic)
        for (CyberCell cell : cells) {
            cell.update();
        }
        
        // Pulsing effect
        double pulse = Math.sin(System.currentTimeMillis() * 0.002) * 0.1 + 0.9;
        torusGroup.setScaleX(pulse);
        torusGroup.setScaleY(pulse);
        torusGroup.setScaleZ(pulse);
        
        double pPulse = Math.sin(System.currentTimeMillis() * 0.004) * 0.2 + 1.0;
        pentagonGroup.setScaleX(pPulse);
        pentagonGroup.setScaleY(pPulse);
        pentagonGroup.setScaleZ(pPulse);
    }
    
    private class CyberCell {
        Sphere sphere;
        boolean alive;
        int lifeTime;
        double baseX, baseY, baseZ;
        Random rand;
        
        public CyberCell(double x, double y, double z, Random rand) {
            this.baseX = x;
            this.baseY = y;
            this.baseZ = z;
            this.rand = rand;
            this.alive = rand.nextBoolean();
            this.lifeTime = 0;
            
            sphere = new Sphere(4);
            updateVisuals();
            sphere.setTranslateX(x);
            sphere.setTranslateY(y);
            sphere.setTranslateZ(z);
        }
        
        public void update() {
            // Game of Life logic
            if (alive) {
                lifeTime++;
                if (lifeTime > 100 || rand.nextDouble() < 0.01) {
                    alive = false;
                    lifeTime = 0;
                }
            } else {
                if (rand.nextDouble() < 0.02) {
                    alive = true;
                    lifeTime = 0;
                }
            }
            
            // Slight movement
            sphere.setTranslateX(baseX + Math.sin(System.currentTimeMillis() * 0.001 + baseX) * 5);
            sphere.setTranslateY(baseY + Math.cos(System.currentTimeMillis() * 0.001 + baseY) * 5);
            sphere.setTranslateZ(baseZ);
            
            updateVisuals();
        }
        
        private void updateVisuals() {
            PhongMaterial material = new PhongMaterial();
            if (alive) {
                Color color = switch (lifeTime % 4) {
                    case 0 -> Color.CYAN;
                    case 1 -> Color.rgb(0, 255, 255);
                    case 2 -> Color.rgb(138, 43, 226);
                    default -> Color.rgb(0, 191, 255);
                };
                material.setDiffuseColor(color);
                material.setSpecularColor(Color.WHITE);
                material.setSpecularPower(50);
                sphere.setRadius(4 + Math.sin(lifeTime * 0.1) * 2);
            } else {
                material.setDiffuseColor(Color.rgb(20, 20, 40));
                sphere.setRadius(2);
            }
            sphere.setMaterial(material);
        }
    }
    
    public static void main(String[] args) {
        launch(args);
    }
}
