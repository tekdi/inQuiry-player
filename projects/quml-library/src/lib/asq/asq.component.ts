import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AsqOptions, AsqInteractions } from '../interfaces/asq-interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'quml-asq',
  templateUrl: './asq.component.html'
})
export class AsqComponent {
  @Input() question?: any;
  @Input() shuffleOptions: boolean;
  @Input() replayed: boolean;
  @Input() tryAgain?: boolean;
  @Output() optionsReordered = new EventEmitter<AsqOptions>();

  public interactions?: AsqInteractions;
  public questionBody?: SafeHtml;
  public layout: 'VERTICAL' | 'HORIZONTAL' | 'DEFAULT';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.setLayout();

    // Sanitize question body
    this.questionBody = this.sanitizeHtml(this.question?.body);
    console.log('ASQ this.questionBody', this.questionBody);

    // Modify interactions with sanitized labels
    if (this.question?.interactions) {
      this.interactions = { ...this.question.interactions };

      if (this.interactions.response1?.options) {
        this.interactions.response1.options = this.interactions.response1.options.map(option => ({
          ...option,
          label: this.sanitizeHtml(option.label)
        }));
      }
    }

    console.log('ASQ this.interactions', this.interactions);
  }

  setLayout(): void {
    const templateId = this.question?.templateId;
    if (templateId === 'asq-vertical') {
      this.layout = 'VERTICAL';
    } else if (templateId === 'asq-horizontal') {
      this.layout = 'HORIZONTAL';
    } else {
      console.error('Invalid or undefined templateId');
      this.layout = 'DEFAULT';
    }
  }

  handleReorderedOptions(reorderedOptions: AsqOptions) {
    this.optionsReordered.emit(reorderedOptions);
  }

  // Helper function to sanitize HTML
  sanitizeHtml(html: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
