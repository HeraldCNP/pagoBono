import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LineChartComponent } from "./components/line-chart/line-chart.component";

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [MaterialModule, PieChartComponent, LineChartComponent],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {

}
