import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import * as Notiflix from 'notiflix';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { LoaderService } from 'src/app/Services/loader.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  allTaskData: any
  ELEMENT_DATA: any = [];
  emptyList: boolean = false;
  permission_create: boolean = true;
  displayedColumns: string[] = ['name', 'email', 'address', 'contact', 'packages', "startDate", "daysLeft", 'action'];
  dataSource: any;
  endDate: any;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  email: any;
  users = [
    { name: 'User 1', daysLeft: 5 },
    { name: 'User 2', daysLeft: 1 },
    { name: 'User 3', daysLeft: 7 },
    { name: 'User 4', daysLeft: 8 },
    { name: 'User 5', daysLeft: 6 },

    // Add more users as needed
  ];

  constructor(
     private auth_service: AuthserviceService,
     private router: Router,
     private snackBar: MatSnackBar,
     private loadingBar: LoadingBarService,
     private loaderService: LoaderService) { }

  ngOnInit() {
    this.getUsers();
    this.dataSource.paginator = this.paginator;
    this.users.forEach((user, index) => {
      setTimeout(() => {
        if (user.daysLeft < 10) {
          this.showNotification(`${user.name} has less than 10 days left!`);
        }
      }, index * 2000); // Adjust delay as needed
    });
  }

  public showNotification(message: string): void {
    // Display a snackbar notification
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getUsers() {
    // this.loaderService.initializerLoader("fetching the user. . .");
    let data = {
      skip: this.pageIndex,
      limit: this.pageSize
    }
    this.auth_service.getUser(data).subscribe((res: any) => {
      this.ELEMENT_DATA = res.Data.result
      console.log("RESPONSE_USER", res.Data.result, res.Data.countData)
      this.endDate = res.Data.result.map((item: any) => {
        console.log("item", item.endDate);
        const today = new Date(); // Get current date
        const end = new Date(item.endDate);
        const difference = end.getTime() - today.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
        console.log("TODAY", today, daysLeft)
        item.daysLeft = daysLeft;
      });
      this.length = res.Data.countData// Assuming Total is the total number of items, adjust it accordingly
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    })
  // this.loaderService.removeLoader(800);
  }

  public addUsers(data: any) {
    this.auth_service.addUsers(data).subscribe((res: any) => {
      console.log("ADDUSER_RESPONSE", res)
    })
  }

  public openModel(email: any) {
    this.email = email;
  }

  public deleteUser() {
    let email = this.email;
    this.auth_service.deleteUser(email).subscribe((res: any) => {
      console.log("DELETE_RES", res)
      Notiflix.Notify.success("User Deleted Successfully")
      this.getUsers();
    }, ((err: any) => {
      console.log("ERROR_MSG", err)
    }))
  }

  onEditUser(data: any) {
    console.log("DATA", data)
    let userId = data
    this.router.navigate(['/dashboard/view-user'], { queryParams: { userId } })
  }

  public reloadPage() {
    window.location.reload();
  }

  public handlePageEvent(e: PageEvent) {
    console.log("EVENT", e)
    this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUsers();
  }
  
}
