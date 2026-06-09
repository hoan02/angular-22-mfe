import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacePioneerService } from '../../services/space-pioneer.service';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-success-card',
  standalone: true,
  imports: [
    CommonModule,
    ...HlmCardImports,
    HlmButton
  ],
  templateUrl: './success-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessCardComponent {
  protected readonly service = inject(SpacePioneerService);
}

