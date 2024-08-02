import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {
  @ViewChild('externalContentContainer', { static: true }) externalContentContainer!: ElementRef;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadExternalHtml(slug);
      }
    });
  }

  private loadExternalHtml(slug: string): void {
    const url = `../../../assets/pages/studio/albums/${slug}.html`; // Adjust the path to your actual HTML files
    this.http.get(url, { responseType: 'text' }).subscribe(
      html => {
        this.externalContentContainer.nativeElement.innerHTML = html;
      },
      error => {
        console.error('Failed to load external HTML:', error);
      }
    );
  }
}
