import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpacePioneerService } from '../../services/space-pioneer.service';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadge } from '@spartan-ng/helm/badge';

@Component({
  selector: 'app-telemetry-preview',
  standalone: true,
  imports: [
    CommonModule,
    ...HlmCardImports,
    HlmBadge
  ],
  templateUrl: './telemetry-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelemetryPreviewComponent {
  protected readonly service = inject(SpacePioneerService);
}

