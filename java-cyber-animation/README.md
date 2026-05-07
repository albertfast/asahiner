# JavaFX Cyber Animation

This project contains the native JavaFX 3D animation (Cyber Torus Knot and Cyber Pentagon) developed previously. 

## Requirements
- Java 17 or higher
- Maven

## How to Run

1. Open a terminal in the root of this project (where `pom.xml` is located).
2. Clean and compile the project using Maven:
   ```bash
   mvn clean install
   ```
3. Run the JavaFX application:
   ```bash
   mvn javafx:run
   ```

## Project Structure
- `src/main/java/com/ahmet/CyberTorusKnot.java`: The main JavaFX application containing the 3D rendering and Game of Life logic.
- `src/main/java/module-info.java`: Java modules configuration for JavaFX.
- `pom.xml`: Maven dependencies and build plugins.

## Integration into another project
If you want to integrate this native Java 3D animation into another Java desktop application:
1. Copy the `com.ahmet` package into your new project's `src/main/java`.
2. Ensure your new project's `pom.xml` or `build.gradle` includes the `javafx-controls` and `javafx-graphics` dependencies.
3. Call or launch `CyberTorusKnot` as a standard JavaFX Application stage.
