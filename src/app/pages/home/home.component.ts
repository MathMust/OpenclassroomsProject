import { Component, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { DataPie } from 'src/app/core/models/DataPie';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { SubtitleComponent } from 'src/app/components/subtitle/subtitle.component';
import { TitleComponent } from 'src/app/components/title/title.component';
import { Router } from '@angular/router';
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface HomeState {
  loading: boolean;
  error: string | null;
  data: DataPie[];
  nbJos: number;
  nbCountries: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleComponent,
    NgxChartsModule,
    SubtitleComponent,
    SpinnerComponent,
    ErrorMessageComponent,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = "Medals per Country";
  titleNbJos: string = "Number of JOs";
  titleNbCountries: string = "Number of countries";

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#793D52', '#89A1DB', '#9780A1', '#BFE0F1', '#B8CBE7', '#956065']
  };

  tooltipVisible: boolean = false;
  tooltipText: string = '';
  tooltipNbMedal: string = '';
  tooltipX: number = 0;
  tooltipY: number = 0;
  hoveredItem: { name: string; value: number; label: string } | null = null;

  view!: [number, number];

  homeState$!: Observable<HomeState>;

  constructor(private olympicService: OlympicService,
    private router: Router) { }

  ngOnInit(): void {
    this.homeState$ = this.olympicService.getOlympics().pipe(
      map(state => {
        const data = state.data ? state.data.map(ol => ({
          name: ol.country,
          value: ol.participations.reduce((sum, p) => sum + p.medalsCount, 0)
        })) : [];

        return {
          loading: state.loading,
          error: state.error,
          data,
          nbJos: state.data ? Math.max(...state.data.map(o => o.participations.length)) : 0,
          nbCountries: state.data ? state.data.length : 0
        };
      })
    );

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.hoveredItem) {
        this.tooltipX = e.clientX - 35;
        this.tooltipY = e.clientY - 50;
      }
    });

    this.updateView();
    window.addEventListener('resize', () => this.updateView());
  }

  onActivate(event: { value: { name: string; value: number; label: string } }): void {
    this.hoveredItem = event.value;
    if (this.hoveredItem) {
      this.tooltipText = `${this.hoveredItem.name}\n`;
      this.tooltipNbMedal = `${this.hoveredItem.value}`;
      this.tooltipVisible = true;
    }
  }

  onSelect(event: { name: string; value: number; label: string }): void {
    this.router.navigateByUrl(`detail/${event.name}`);
  }

  onDeactivate(): void {
    this.tooltipVisible = false;
    this.hoveredItem = null;
  }

  updateView(): void {
    const width = window.innerWidth;
    this.view = [Math.min(800, width), Math.min(800, width)];
  }
}
