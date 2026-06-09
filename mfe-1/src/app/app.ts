import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpacePioneerService } from './services/space-pioneer.service';
import { EnrollmentFormComponent } from './components/enrollment-form/enrollment-form';
import { TelemetryPreviewComponent } from './components/telemetry-preview/telemetry-preview';
import { SuccessCardComponent } from './components/success-card/success-card';

@Component({
  selector: 'app-mfe1',
  standalone: true,
  imports: [
    CommonModule,
    EnrollmentFormComponent,
    TelemetryPreviewComponent,
    SuccessCardComponent
  ],
  providers: [SpacePioneerService],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly service = inject(SpacePioneerService);
}
