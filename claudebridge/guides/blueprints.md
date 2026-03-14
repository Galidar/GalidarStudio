---
sidebar_position: 1
title: Blueprint Manipulation
---

# Blueprint Manipulation

ClaudeBridge provides **36 tools** for working with Blueprints — from creating variables and functions to wiring complex node graphs.

---

## Workflow Overview

```
1. read_blueprint       → Understand the BP structure
2. analyze_graph        → See existing nodes and connections
3. Create/modify        → add_node, create_variable, create_function
4. Wire logic           → connect_pins
5. compile_blueprint    → Validate changes
```

:::tip Always Inspect First
Before modifying any Blueprint, use `read_blueprint` and `analyze_graph` to understand what already exists. UE may auto-create nodes like BeginPlay.
:::

---

## Adding Nodes

The `add_node` tool supports 23+ node types:

| Node Type | Description | Key Params |
|-----------|-------------|------------|
| `CallFunction` | Call any UFUNCTION | `function_class`, `function_name` |
| `Branch` | If/Then/Else | — |
| `Sequence` | Execution sequence | — |
| `Event` | Standard event | `event_name` |
| `VariableGet` | Variable getter | `variable_name` |
| `VariableSet` | Variable setter | `variable_name` |
| `Print` | PrintString shorthand | `message` |
| `DynamicCast` | Cast to class | `target_class` |
| `SpawnActorFromClass` | Spawn actor | — |
| `Timeline` | Timeline node | `timeline_name` |
| `MakeArray` | Array literal | — |
| `Knot` | Reroute node | — |

### Example: Add Delay + Print

```
1. add_node(blueprint="BP_MyActor", node_type="CallFunction",
            function_class="KismetSystemLibrary", function_name="Delay")
2. set_node_property(node_name="...", pin_name="Duration", default_value="2.0")
3. add_node(node_type="Print", message="Delayed!")
4. connect_pins(source → Delay.execute, target → "then")
5. connect_pins(source → Delay.then, target → Print.execute)
```

---

## Pin Connections

### Common Pin Names

| Node Type | Input Pins | Output Pins |
|-----------|-----------|-------------|
| Events | — | `then` |
| CallFunction | `execute`, params | `then`, `ReturnValue` |
| Branch | `execute`, `Condition` | `True`, `False` |
| Sequence | `execute` | `Then_0`, `Then_1`, ... |
| VariableGet | — | variable name |
| VariableSet | `execute`, variable name | `then` |

### Connecting Pins

```
connect_pins(
    blueprint="BP_MyActor",
    source_node="K2Node_Event_0",
    source_pin="then",
    target_node="K2Node_CallFunction_0",
    target_pin="execute"
)
```

:::info Node IDs
Node IDs (like `K2Node_Event_0`) are returned by `add_node` and visible in `analyze_graph` output. Always use the exact ID from the response.
:::

---

## Variables

```
create_variable(blueprint="BP_MyActor", name="Health", type="float", default_value="100.0")
set_variable_properties(name="Health", instance_editable=true, category="Stats")
```

**Supported types**: `bool`, `byte`, `int`, `int64`, `float`, `double`, `string`, `name`, `text`, `vector`, `rotator`, `transform`, `object`

---

## Functions

```
create_function(blueprint="BP_MyActor", name="CalculateDamage")
add_function_input(function="CalculateDamage", param_name="BaseDamage", param_type="float")
add_function_output(function="CalculateDamage", param_name="FinalDamage", param_type="float")
```

---

## CallFunction Reference

The `CallFunction` node can invoke any UFUNCTION. Common classes:

| Class | Common Functions |
|-------|-----------------|
| `KismetSystemLibrary` | `PrintString`, `Delay`, `IsValid`, `LineTraceSingle` |
| `KismetMathLibrary` | `Add_FloatFloat`, `FClamp`, `RandomFloatInRange`, `Lerp` |
| `GameplayStatics` | `GetPlayerController`, `OpenLevel`, `SpawnActor` |
| `Actor` | `K2_GetActorLocation`, `K2_SetActorLocation`, `K2_DestroyActor` |

---

## Validation

After modifying a Blueprint, always compile:

```
compile_blueprint(blueprint="BP_MyActor")
```

For deeper validation:
```
validate_blueprint(blueprint="BP_MyActor")     → Check for issues
find_unused_variables(blueprint="BP_MyActor")   → Clean up
```
