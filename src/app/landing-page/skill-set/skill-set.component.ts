import {Component, OnInit} from '@angular/core';
import {AnimationService} from "../../animation.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ScrollService} from "../../scroll.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

/** Represents a single technical skill */
interface Skill {
  name: string;
  icon: string;
}

/** Represents a growth mindset skill with associated learning skills */
interface GrowthSkill {
  name: string;
  icon: string;
  learning: Skill[];
}

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
/**
 * SkillSetComponent
 *
 * Standalone Angular component that displays the user's technical skills
 * and growth mindset skills.
 *
 * Features:
 * - Displays a list of main technical skills with icons
 * - Shows growth/learning skills dynamically
 * - Supports hover animations via AnimationService
 * - Smooth scrolls to contact section using ScrollService
 * - Updates "Growth mindset" label based on current language
 */
export class SkillSetComponent implements OnInit {

  /** List of main technical skills with icons */
  skills: Skill[] = [
    { name: 'HTML', icon: 'assets/img/icons/skills/html.svg' },
    { name: 'CSS', icon: 'assets/img/icons/skills/css.svg' },
    { name: 'JavaScript', icon: 'assets/img/icons/skills/javascript.svg' },
    { name: 'Material Design', icon: 'assets/img/icons/skills/md.svg' },
    { name: 'TypeScript', icon: 'assets/img/icons/skills/typescript.svg' },
    { name: 'Angular', icon: 'assets/img/icons/skills/angular.svg' },
    { name: 'Firebase', icon: 'assets/img/icons/skills/firebase.svg' },
    { name: 'Git', icon: 'assets/img/icons/skills/git.svg' },
    { name: 'REST-API', icon: 'assets/img/icons/skills/api.svg' },
    { name: 'Scrum', icon: 'assets/img/icons/skills/scrum.svg' },
    { name: 'Bootstrap', icon: 'assets/img/icons/skills/bootstrap.svg' },
    { name: 'JAVA', icon: 'assets/img/icons/skills/java.svg' },
    { name: 'PHP', icon: 'assets/img/icons/skills/php.svg' },
    { name: 'Twig', icon: 'assets/img/icons/skills/twig.svg' },
    { name: 'SQL', icon: 'assets/img/icons/skills/sql.svg' },
    { name: 'Docker', icon: 'assets/img/icons/skills/docker.svg' },
    { name: 'Drupal', icon: 'assets/img/icons/skills/drupal.svg' },
    { name: 'Wordpress', icon: 'assets/img/icons/skills/wordpress.svg' }
  ];

  /** Growth mindset skill and its associated learning skills */
  growth: GrowthSkill = {
    name: 'Growth mindset',
    icon: 'assets/img/icons/skills/growth.svg',
    learning: [
      { name: 'React', icon: 'assets/img/icons/skills/react.svg' },
      { name: 'Vue', icon: 'assets/img/icons/skills/vue.svg' },
      { name: 'Python', icon: 'assets/img/icons/skills/python.svg' }
    ]
  };

  /**
   * Creates an instance of SkillSetComponent.
   *
   * @param animationService - Handles hover/animation effects on skill buttons
   * @param scrollService - Provides smooth scrolling to page sections
   * @param translate - Handles translation and language changes
   */
  constructor(
    private animationService: AnimationService,
    private scrollService: ScrollService,
    private translate: TranslateService
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   *
   * - Loads translated "Growth mindset" label
   * - Subscribes to language changes to update the label dynamically
   */
  ngOnInit(): void {
    this.loadGrowthName();

    this.translate.onLangChange.subscribe((): void => {
      this.loadGrowthName();
    });
  }

  /**
   * Loads the translated "Growth mindset" label and updates the `growth.name` property.
   */
  loadGrowthName(): void {
    this.translate.get('SKILLS.MINDSET').subscribe(translated => {
      this.growth.name = translated;
    });
  }

  /**
   * Starts the marquee button animation on hover.
   *
   * @param event - The DOM hover event
   */
  onHover(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    this.animationService.startMarqueeBtnAnimation(target);
  }

  /**
   * Returns the marquee button to its center position when hover ends.
   *
   * @param event - The DOM mouse leave event
   */
  onHoverOut(event: Event): void {
    const target = event.currentTarget as HTMLElement;
    this.animationService.returnMarqueeBtnToCenter(target);
  }

  /**
   * Smoothly scrolls to the contact section of the page.
   */
  goToContact(): void {
    this.scrollService.scrollToFragment('contact', 200);
  }
}
