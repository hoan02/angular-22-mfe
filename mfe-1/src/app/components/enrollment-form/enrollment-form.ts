import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { SpacePioneerService } from '../../services/space-pioneer.service';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmLabel } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSwitch } from '@spartan-ng/helm/switch';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [
    FormField,
    CommonModule,
    Combobox,
    ComboboxPopup,
    ComboboxWidget,
    Listbox,
    Option,
    HlmButton,
    HlmInput,
    HlmLabel,
    ...HlmCardImports,
    HlmSwitch
  ],
  templateUrl: './enrollment-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentFormComponent {
  protected readonly service = inject(SpacePioneerService);


  // States to control expansion of dropdown menus
  protected readonly destinationExpanded = signal(false);
  protected readonly roleExpanded = signal(false);

  // Getters and setters for ngListbox array-based values
  get destinationValueArray(): string[] {
    const val = this.service.model().missionDetails.destination;
    return val ? [val] : [];
  }
  set destinationValueArray(vals: any[]) {
    if (vals && vals.length > 0) {
      this.service.model.update((m) => ({
        ...m,
        missionDetails: {
          ...m.missionDetails,
          destination: vals[0],
        },
      }));
    }
  }

  get roleValueArray(): string[] {
    const val = this.service.model().missionDetails.role;
    return val ? [val] : [];
  }
  set roleValueArray(vals: any[]) {
    if (vals && vals.length > 0) {
      this.service.model.update((m) => ({
        ...m,
        missionDetails: {
          ...m.missionDetails,
          role: vals[0],
        },
      }));
    }
  }

  // Translation helpers for semantic selections
  getDestinationLabel(value: string): string {
    switch (value) {
      case 'Mars Base Alpha': return 'Căn cứ Sao Hỏa Alpha';
      case 'Europa Sub-surface': return 'Đại dương ngầm Europa';
      case 'Titan Station': return 'Trạm vũ trụ Titan';
      default: return 'Chọn địa điểm đến';
    }
  }

  getRoleLabel(value: string): string {
    switch (value) {
      case 'Engineer': return 'Kỹ sư';
      case 'Scientist': return 'Nhà khoa học';
      case 'Pilot': return 'Phi công';
      case 'Medical': return 'Sĩ quan Y tế';
      default: return 'Chọn vị trí chuyên môn';
    }
  }
}
