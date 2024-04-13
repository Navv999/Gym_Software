import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  updateButtonhide:Boolean = false;

  roles = [
    { role: 'admin', display: 'Admin' },
    { role: 'user', display: 'User' },
    { role: 'manager', display: 'Manager' },
    // Add more roles as needed
  ];
  public updteButtonEnable(event:any) {
    if (event) {
      this.updateButtonhide = true;
    }
    else {
      this.updateButtonhide = false;
    }
  }
  selectedOptions = new FormControl([]);

subscriptionsArray = [
  {
    display_Name: 'Subscription 1',
    created_Date: new Date(2022, 3, 15),
    state: 'Active',
    primary_Key: 'primary_key_1',
    secondary_Key: 'secondary_key_1'
  },
  {
    display_Name: 'Subscription 2',
    created_Date: new Date(2022, 6, 25),
    state: 'Inactive',
    primary_Key: 'primary_key_2',
    secondary_Key: 'secondary_key_2'
  },
  {
    display_Name: 'Subscription 1',
    created_Date: new Date(2022, 3, 15),
    state: 'Active',
    primary_Key: 'primary_key_1',
    secondary_Key: 'secondary_key_1'
  },
  {
    display_Name: 'Subscription 2',
    created_Date: new Date(2022, 6, 25),
    state: 'Inactive',
    primary_Key: 'primary_key_2',
    secondary_Key: 'secondary_key_2'
  }, {
    display_Name: 'Subscription 1',
    created_Date: new Date(2022, 3, 15),
    state: 'Active',
    primary_Key: 'primary_key_1',
    secondary_Key: 'secondary_key_1'
  },
  {
    display_Name: 'Subscription 2',
    created_Date: new Date(2022, 6, 25),
    state: 'Inactive',
    primary_Key: 'primary_key_2',
    secondary_Key: 'secondary_key_2'
  }, {
    display_Name: 'Subscription 1',
    created_Date: new Date(2022, 3, 15),
    state: 'Active',
    primary_Key: 'primary_key_1',
    secondary_Key: 'secondary_key_1'
  },
  {
    display_Name: 'Subscription 2',
    created_Date: new Date(2022, 6, 25),
    state: 'Inactive',
    primary_Key: 'primary_key_2',
    secondary_Key: 'secondary_key_2'
  }, {
    display_Name: 'Subscription 1',
    created_Date: new Date(2022, 3, 15),
    state: 'Active',
    primary_Key: 'primary_key_1',
    secondary_Key: 'secondary_key_1'
  },
  {
    display_Name: 'Subscription 2',
    created_Date: new Date(2022, 6, 25),
    state: 'Inactive',
    primary_Key: 'primary_key_2',
    secondary_Key: 'secondary_key_2'
  },
  // Add more static data as needed
];

constructor() { }
}