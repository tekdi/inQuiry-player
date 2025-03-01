import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MtfInteractions, MtfOptions } from '../interfaces/mtf-interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'quml-mtf',
  templateUrl: './mtf.component.html',
  styleUrls: ['./mtf.component.scss']
})
export class MtfComponent implements OnInit {
  @Input() question?: any;
  @Input() shuffleOptions: boolean;
  @Input() replayed: boolean;
  @Input() tryAgain?: boolean;
  @Output() optionsReordered = new EventEmitter<MtfOptions>();

  public interactions?: MtfInteractions;
  public questionBody?: SafeHtml;
  public layout: 'VERTICAL' | 'HORIZONTAL' | 'DEFAULT';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.setLayout();

    // Sanitize the question body
    this.questionBody = this.sanitizeHtml(this.question?.body);
    console.log('MTF this.questionBody', this.questionBody);

    // Sanitize interactions if available
    if (this.question?.interactions) {
      this.interactions = { ...this.question.interactions };

      if (this.interactions.response1?.options) {
        this.interactions.response1.options.left = this.interactions.response1.options.left.map(option => ({
          ...option,
          label: this.sanitizeHtml(option.label)
        }));

        this.interactions.response1.options.right = this.interactions.response1.options.right.map(option => ({
          ...option,
          label: this.sanitizeHtml(option.label)
        }));
      }
    }

    console.log('MTF this.interactions', this.interactions);
  }

  setLayout(): void {
    const templateId = this.question?.templateId;
    if (templateId === 'mtf-vertical') {
      this.layout = 'VERTICAL';
    } else if (templateId === 'mtf-horizontal') {
      this.layout = 'HORIZONTAL';
    } else {
      console.error('Invalid or undefined templateId');
      this.layout = 'DEFAULT';
    }
  }

  handleReorderedOptions(reorderedOptions: MtfOptions) {
    this.optionsReordered.emit(reorderedOptions);
  }

  // Sanitize HTML content
  sanitizeHtml(html: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
