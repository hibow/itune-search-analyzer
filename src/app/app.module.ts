import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItuneSearchComponent } from "./itune-search/itune-search.component";
import { ItuneSearchListComponent } from "./itune-search-list/itune-search-list.component";
import { ItemViewComponent } from "./item-view/item-view.component";
import { RecordLabelComponent } from "./record-label/record-label.component";
import { ArtistViewComponent } from "./artist-view/artist-view.component";
import { PriceViewComponent } from "./price-view/price-view.component";
import { ChartsModule } from "ng2-charts";
import { BarChartComponent } from "./bar-chart/bar-chart.component";
import { DoughtnutChartComponent } from "./doughtnut-chart/doughtnut-chart.component";

@NgModule({
  declarations: [
    AppComponent,
    ItuneSearchComponent,
    ItuneSearchListComponent,
    ItemViewComponent,
    RecordLabelComponent,
    ArtistViewComponent,
    PriceViewComponent,
    BarChartComponent,
    DoughtnutChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
