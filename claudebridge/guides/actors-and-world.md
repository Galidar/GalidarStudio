---
sidebar_position: 3
title: Actors & World
---

# Actors & World Management

ClaudeBridge provides **20 Actor tools** and **9 World tools** for managing your level.

---

## Spawning Actors

```
# Spawn from a Blueprint
spawn_actor(
    blueprint="/Game/Blueprints/BP_Pickup",
    location={"x": 100, "y": 200, "z": 50},
    rotation={"pitch": 0, "yaw": 45, "roll": 0}
)

# Spawn from a class
spawn_actor(
    class="StaticMeshActor",
    location={"x": 0, "y": 0, "z": 0}
)
```

---

## Transforming Actors

```
set_actor_transform(
    actor="BP_Pickup_1",
    location={"x": 500, "y": 0, "z": 100},
    rotation={"pitch": 0, "yaw": 90, "roll": 0},
    scale={"x": 2, "y": 2, "z": 2}
)
```

---

## Properties

```
# Read a property
get_actor_property(actor="BP_Player", property="MaxHealth")

# Set a property
set_actor_property(actor="BP_Player", property="MaxHealth", value="200")
```

---

## Components

```
# Add a component
add_component(actor="BP_Player", type="PointLightComponent", name="HeadLight")

# Configure it
set_component_property(
    actor="BP_Player",
    component="HeadLight",
    property="Intensity",
    value="5000"
)

# List all components
list_components(actor="BP_Player")
```

---

## Finding Actors

```
# List all actors (with optional class filter)
list_actors(class_filter="StaticMeshActor")

# Search by name
find_actors_by_name(pattern="*Pickup*")

# Get detailed info
get_actor_details(actor="BP_Player_0")
```

---

## Lights

```
spawn_light(
    type="PointLight",
    location={"x": 0, "y": 0, "z": 300},
    intensity=50000,
    color={"r": 1, "g": 0.9, "b": 0.7}
)

set_light_properties(
    actor="PointLight_0",
    intensity=100000,
    attenuation_radius=1000,
    cast_shadows=true
)
```

---

## Physics

```
# Enable physics on an actor
set_simulate_physics(actor="SM_Crate", simulate=true)

# Apply an impulse
apply_impulse(actor="SM_Crate", impulse={"x": 0, "y": 0, "z": 50000})

# Set mass
set_mass_override(actor="SM_Crate", mass=100.0)
```

---

## Level Management

```
# Save the current level
save_level()

# Get level info
get_level_info()

# Open a different level
open_level(path="/Game/Maps/MainMenu")

# Build lighting
build_lighting()
```
