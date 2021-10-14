import {Component, OnInit} from '@angular/core';
import {ShellService} from "./services/shell.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private shellService:ShellService) {
  }
  title = 'shell-frontend';
  userInput = '';
  output = 'No output yet.'
  cachedResults: string[] = [];

  ngOnInit(): void {
    this.getCachedOutputs();
  }

  private getCachedOutputs(): void {
    this.shellService.getCommandOutputs().subscribe(
      response => {
        this.cachedResults = [];
        for(let singleOutput of JSON.parse(response)){
          this.cachedResults.push(JSON.stringify(singleOutput));
        }
      }
    )
  }

  execute(): void {
    this.shellService.executeShellCommand(this.userInput).pipe(
      catchError(val => {
        this.userInput = '';
        this.output = val;
        this.getCachedOutputs();
        return of(val)})
    ).subscribe(
      response => {
        console.log(response)
        this.output = response;
        this.userInput = '';
        this.getCachedOutputs();
      }
    )
  }
}
