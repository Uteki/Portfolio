import {Component, OnInit} from '@angular/core';
import {AnimationService} from "../../animation.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ScrollService} from "../../scroll.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

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
export class SkillSetComponent implements OnInit {
  skills = [
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

  growth = {
    name: 'Growth mindset',
    icon: 'assets/img/icons/skills/growth.svg',
    learning: [
      { name: 'React', icon: 'assets/img/icons/skills/react.svg' },
      { name: 'Vue', icon: 'assets/img/icons/skills/vue.svg' },
      { name: 'Python', icon: 'assets/img/icons/skills/python.svg' }
    ]
  };

  constructor(
    private animationService: AnimationService,
    private scrollService: ScrollService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadGrowthName();

    this.translate.onLangChange.subscribe(() => {
      this.loadGrowthName();
    });
  }

  loadGrowthName() {
    this.translate.get('SKILLS.MINDSET').subscribe(translated => {
      this.growth.name = translated;
    });
  }

  onHover(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.startMarqueeBtnAnimation(target);
  }

  onHoverOut(event: Event) {
    const target = event.currentTarget as HTMLElement;
    this.animationService.returnMarqueeBtnToCenter(target);
  }

  goToContact() {
    this.scrollService.scrollToFragment('contact', 200);
  }
}
