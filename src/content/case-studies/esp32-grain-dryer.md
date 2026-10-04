---
slug: esp32-grain-dryer
title: Grain Dryer Automation Prototype
period: "2026"
category: Embedded
role: Firmware & control logic
stack:
  - C
  - ESP32
  - DHT22
  - BH1750
  - Relay Control
summary: Embedded Systems course project — an ESP32 in C reads temperature, humidity, light, and rain sensors, then drives a relay-controlled heater through threshold-based logic.
---

## Context

Drying grain after harvest depends on conditions that change faster than a person can watch them: temperature, humidity, available light, and whether it is raining. This was the final project for an Embedded Systems course — a prototype that reads those conditions and controls a heater without someone standing over it.

## My role

Firmware and control logic. I wrote the ESP32 program in C: sensor reads, the decision logic, and the relay output.

## Approach

The control loop reads four inputs — DHT22 for temperature and humidity, BH1750 for light, and a raindrop sensor — then applies threshold-based conditions to decide the heater's state. The thresholds are explicit comparisons rather than anything adaptive; the goal was a prototype that behaves predictably enough to reason about.

## What was built

An ESP32 program in C that polls the sensor set, evaluates the thresholds, and drives a relay controlling the heater through a digital output. It runs continuously on the device.

## Outcome

The prototype works as a demonstration of closed-loop control: change the conditions the sensors see, and the heater responds without intervention.

## The part that mattered most

The most useful code in this project is one guard. A sensor read can fail — a loose connection, a timing problem, a sensor that returns nothing — and an `isnan` check keeps a failed read from propagating into the threshold comparison. Without it, a bad read would produce a garbage value, the comparison would evaluate unpredictably, and the heater could switch based on a number that was never measured.

For anything driving physical hardware, that is not defensive programming for its own sake. It is the difference between "the sensor glitched" and "the heater did something unexpected."

## What I would do differently

The thresholds are compile-time constants, so changing them means reflashing the device. Exposing them over a serial command or a small config interface would make the prototype far easier to tune against real conditions. I would also add sensor-failure reporting back to the operator, rather than only guarding against it internally.
