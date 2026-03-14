---
sidebar_position: 2
title: Material Creation
---

# Material Creation

ClaudeBridge provides **28 tools** for creating and editing Materials, Material Instances, and Material Functions.

---

## Workflow

```
1. create_material              → New empty material
2. create_material_expression   → Add nodes (textures, params, math)
3. connect_material_expressions → Wire nodes together
4. set_material_properties      → Blend mode, shading model, etc.
5. recompile_material           → Compile and validate
```

---

## Creating a Basic PBR Material

### Step by step:

```
# 1. Create the material
create_material(path="/Game/Materials", name="M_BrickWall")

# 2. Add a VectorParameter for Base Color
create_material_expression(
    material="/Game/Materials/M_BrickWall",
    type="VectorParameter",
    name="BaseColor",
    default_value="(R=0.8, G=0.2, B=0.1, A=1.0)"
)

# 3. Add ScalarParameter for Roughness
create_material_expression(
    material="/Game/Materials/M_BrickWall",
    type="ScalarParameter",
    name="Roughness",
    default_value="0.7"
)

# 4. Connect to material outputs
connect_material_expressions(
    source_expression="BaseColor",
    target="BaseColor"  # Material property
)

connect_material_expressions(
    source_expression="Roughness",
    target="Roughness"
)

# 5. Compile
recompile_material(material="/Game/Materials/M_BrickWall")
```

---

## Quick Material from Textures

Use the shortcut tool to create a complete PBR material from texture files:

```
create_material_from_textures(
    path="/Game/Materials",
    name="M_Brick",
    base_color="/Game/Textures/T_Brick_BaseColor",
    normal="/Game/Textures/T_Brick_Normal",
    roughness="/Game/Textures/T_Brick_Roughness"
)
```

This automatically creates TextureSample nodes, connects them to the correct material inputs, and compiles.

---

## Material Instances

Create parameterized variations without duplicating the graph:

```
# Create instance
create_material_instance(
    parent="/Game/Materials/M_BrickWall",
    path="/Game/Materials",
    name="MI_BrickWall_Blue"
)

# Override parameters
set_mi_vector_param(instance="MI_BrickWall_Blue", name="BaseColor", value="(R=0.1,G=0.2,B=0.8,A=1)")
set_mi_scalar_param(instance="MI_BrickWall_Blue", name="Roughness", value="0.3")
```

---

## Expression Types

Common material expression types for `create_material_expression`:

| Type | Description |
|------|-------------|
| `TextureSample` | Sample a texture |
| `VectorParameter` | Color/vector parameter |
| `ScalarParameter` | Float parameter |
| `Multiply` | Multiply two values |
| `Add` | Add two values |
| `Lerp` | Linear interpolation |
| `Fresnel` | Fresnel effect |
| `TextureCoordinate` | UV coordinates |
| `Panner` | Animated UVs |
| `Noise` | Procedural noise |

Use `list_expression_types` to discover all available types.

---

## Material Properties

```
set_material_properties(
    material="/Game/Materials/M_Glass",
    blend_mode="Translucent",
    shading_model="DefaultLit",
    two_sided=true
)
```

---

## Applying Materials

```
# Apply to an actor in the level
apply_material_to_actor(
    actor="SM_Wall",
    material="/Game/Materials/M_BrickWall",
    slot=0
)

# Check current materials on an actor
get_actor_material_info(actor="SM_Wall")
```

---

## Performance Analysis

```
get_material_stats(material="/Game/Materials/M_BrickWall")
```

Returns shader instruction counts, texture samples, and other performance metrics.
