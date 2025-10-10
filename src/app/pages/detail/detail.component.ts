import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { TitleComponent } from '../../components/title/title.component';
import { SubtitleComponent } from '../../components/subtitle/subtitle.component';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";
import { DataState } from 'src/app/core/models/DataState';
import { OlympicSummary } from 'src/app/core/models/OlympicSummary';
import { BtnReturnHomeComponent } from "src/app/components/btn-return-home/btn-return-home.component";
import { DataChartLine } from 'src/app/core/models/DataChartLine';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TitleComponent,
    SubtitleComponent,
    NgxChartsModule,
    SpinnerComponent,
    ErrorMessageComponent,
    BtnReturnHomeComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {

  private destroy$ = new Subject<void>();

  country!: string;
  olympic$!: Observable<DataState<OlympicSummary | null>>;
  chartData: DataChartLine[] = [];
  titleNbEntries: string = "Number of entries";
  titleTotalNbMedals: string = "Total number medals";
  titleTotalNbAthletes: string = "Total number of athletes";
  nbEntries: number = 0;
  totalNbMedals: number = 0;
  totalNbAthletes: number = 0;
  loading: boolean = false;
  errorMessage: string | null = null;
  view!: [number, number];

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.country = this.route.snapshot.params['country'];
    this.olympic$ = this.olympicService.getOlympicByCountry(this.country);

    this.olympic$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      if (state.data) {
        this.chartData = [{
          name: state.data.country,
          series: state.data.participations.map(p => ({
            name: p.year.toString(),
            value: p.medalsCount
          }))
        }];
      }
    });
    this.updateView();
    window.addEventListener('resize', () => this.updateView());

  }

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#793D52']
  };

  updateView(): void {
    const width: number = window.innerWidth;
    this.view = [Math.min(600, width), Math.min(500, width)];
  }

  getMaxValue(): number {
    let max: number = 0;
    this.chartData.forEach(data => {
      data.series.forEach(point => {
        if (point.value > max) max = point.value;
      });
    });
    return max + 2;
  }

  getMinValue(): number {
    let min: number = Number.MAX_VALUE;
    this.chartData.forEach(data => {
      data.series.forEach(point => {
        if (point.value < min) min = point.value;
      });
    });
    return min - 2;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
