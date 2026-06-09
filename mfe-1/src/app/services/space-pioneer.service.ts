import { Injectable, signal } from '@angular/core';
import { SpacePioneerModel, INITIAL_MODEL } from '../models/space-pioneer.model';
import {
  form,
  submit,
  required,
  email,
  min,
  max,
  minLength,
  pattern,
  disabled,
  validate,
  debounce,
  applyEach
} from '@angular/forms/signals';

@Injectable()
export class SpacePioneerService {
  // Model signal holding the form data
  readonly model = signal<SpacePioneerModel>({ ...INITIAL_MODEL });

  // Signal Form definition with validation rules and field states
  readonly spaceForm = form(this.model, (s) => {
    // 1. Personal Info Validations
    required(s.personalInfo.fullName, { message: 'Họ và tên là bắt buộc' });
    minLength(s.personalInfo.fullName, 5, { message: 'Họ tên phải chứa ít nhất 5 ký tự' });
    pattern(s.personalInfo.fullName, /^[a-zA-Z\s]*$/, { message: 'Họ tên chỉ được chứa chữ cái và khoảng trắng' });
    
    required(s.personalInfo.email, { message: 'Địa chỉ email là bắt buộc' });
    email(s.personalInfo.email, { message: 'Vui lòng nhập địa chỉ email hợp lệ' });

    required(s.personalInfo.age, { message: 'Tuổi là bắt buộc' });
    min(s.personalInfo.age, 18, { message: 'Phải từ 18 tuổi trở lên để ứng tuyển' });
    max(s.personalInfo.age, 80, { message: 'Phải dưới 80 tuổi để ứng tuyển' });

    // 2. Mission Details Validations
    required(s.missionDetails.destination, { message: 'Điểm đến là bắt buộc' });
    required(s.missionDetails.role, { message: 'Vị trí chuyên môn là bắt buộc' });

    // Conditionally disable/enable yearsOfExperience field depending on hasExperience checkbox
    disabled(s.missionDetails.yearsOfExperience, {
      when: ({ valueOf }) => !valueOf(s.missionDetails.hasExperience),
    });

    // Custom validation for experience years
    validate(s.missionDetails.yearsOfExperience, ({ value, valueOf }) => {
      const hasExp = valueOf(s.missionDetails.hasExperience);
      if (hasExp && value() < 1) {
        return { kind: 'minExp', message: 'Nếu đã có kinh nghiệm, thời gian phải tối thiểu 1 năm' };
      }
      return undefined;
    });

    // Debounce the name check
    debounce(s.personalInfo.fullName, 200);

    // 3. Dynamic Array Validation
    applyEach(s.companions, (companion) => {
      required(companion.name, { message: 'Tên người đồng hành là bắt buộc' });
      required(companion.relation, { message: 'Mối quan hệ là bắt buộc' });
    });
  });

  // Submission tracking signals
  readonly isSubmitted = signal(false);
  readonly isSubmitting = signal(false);
  readonly submissionData = signal<SpacePioneerModel | null>(null);

  // Companion Array Actions
  addCompanion() {
    this.model.update((m) => ({
      ...m,
      companions: [...m.companions, { name: '', relation: 'Family' }],
    }));
  }

  removeCompanion(index: number) {
    this.model.update((m) => ({
      ...m,
      companions: m.companions.filter((_, i) => i !== index),
    }));
  }

  // Submit Logic
  transmitPayload() {
    submit(this.spaceForm, async () => {
      this.isSubmitting.set(true);
      
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.submissionData.set(this.model());
    });
  }

  // Reset Form
  resetForm() {
    this.isSubmitted.set(false);
    this.submissionData.set(null);
    this.model.set({
      personalInfo: {
        fullName: '',
        email: '',
        age: 25,
      },
      missionDetails: {
        destination: 'Mars Base Alpha',
        role: 'Engineer',
        hasExperience: false,
        yearsOfExperience: 0,
      },
      companions: [],
    });
    this.spaceForm().reset();
  }
}
