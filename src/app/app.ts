import { Component, signal, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { NgxParticlesModule } from '@tsparticles/angular';
import { MoveDirection, OutMode, Container, Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    Navbar, 
    Hero, 
    About, 
    Skills, 
    Experience, 
    Projects, 
    Contact,
    NgxParticlesModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  protected readonly title = signal('Hicham El Hmaydi - Portfolio');
  
  particlesId = "tsparticles";
  
  particlesOptions = {
    background: {
      color: { value: "transparent" }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true, delay: 0.5 }
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 }
      }
    },
    particles: {
      color: { value: "#8b5cf6" },
      links: {
        color: "#00f0ff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: { default: OutMode.bounce },
        random: false,
        speed: 1,
        straight: false
      },
      number: { density: { enable: true }, value: 60 },
      opacity: { value: 0.4 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
  };

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
  
  ngOnInit(): void {
    // Basic init if needed
  }
  
  ngAfterViewInit(): void {
    // GSAP Animations
    const sections = ['#hero', '#about', '#skills', '#experience', '#projects', '#contact'];
    
    sections.forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }
}
