import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ShellService {
  constructor(private http: HttpClient) { }

  executeShellCommand(command: string): Observable<string> {
    command = command.replace(/&&/g,'%26%26');
    return this.http.get(
      'http://localhost:3001/execute?command='+command, {responseType: 'text'});
  }

  getCommandOutputs(): Observable<string> {
    return this.http.get(
      'http://localhost:3001/outputs', {responseType: 'text'});
  }
}
