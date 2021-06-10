import { Component, OnInit ,ViewChild } from '@angular/core';
import { LeadServiceService } from '../lead-service.service';
import { ActivatedRoute, Router } from '@angular/router';

export class LeadList {
    public id: number;
    public updated_at: Date;
    public created_at: Date;
    public first_name : string;
    public last_name : string;
    public mobile : number;
    public email : string;
    public location_type : string;
    public location_string : string;
    public status : string;
    public communication : string;
    public tags : string;
  constructor(
    id: number,
    updated_at: Date,
    created_at: Date,
    first_name : string,
    last_name : string,
    mobile : number,
    email : string,
    location_type : string,
    location_string : string,
    status : string,
    communication : string,
    tags : string
  ) {
    this.id=id;
    this.first_name=first_name;
    this.last_name=last_name;
    this.mobile=mobile;
    this.email=email;
    this.location_string=location_string;
    this.location_type=location_type;
    this.communication=communication;
  }
}

export class MarkLead{
  public communication : string;
  constructor(communication : string)
  {
    this.communication=communication;
  }
}

@Component({
  selector: 'app-lead-dashboard',
  templateUrl: './lead-dashboard.component.html',
  styleUrls: ['./lead-dashboard.component.scss']
})
export class LeadDashboardComponent implements OnInit {
   
  @ViewChild('addclosebutton') addclosebutton;
  @ViewChild('updateclosebutton') updateclosebutton;
  @ViewChild('deleteclosebutton') deleteclosebutton;
  leadLists : LeadList;
  markLead: MarkLead;
  constructor(private readonly leadService : LeadServiceService,private readonly actroute: ActivatedRoute,
    private readonly router : Router) { }

  ngOnInit() {
    
    this.leadLists=new LeadList(null,null,null,null,null,null,null,null,null,null,null,null);
    this.markLead=new MarkLead('');
    this.fetchAllLeads();
    this.updateId='';
  }

  title = 'Lead Table';
  row1 = 'Name';
  row2 = 'Email';
  row3 = 'Mobile Num';
  row4 = 'Location Type';
  row5 = 'Location string';
  row6 = 'Action';

  leads: LeadList[];
  communication: string;
  updateId: string;
  deleteId: string;
  fetchAllLeads()
  {
    this.leadService.retrieveAllLeads().subscribe(
      response => {
        console.log(response);
        this.leads = response;
      }
    );
  }

  setUpdateId(id) {
    this.updateId=id;
  };

  setDeleteId(id){
    this.deleteId=id;
  }
  deleteLead(id)
  {
    this.leadService.deleteLeadById(id).subscribe(
      response => {
        console.log(response)
        this.fetchAllLeads();
        this.deleteclosebutton.nativeElement.click();
      }
    );
  }
  updateLead(id)
  {
    this.leadService.updateLead(this.markLead,id).subscribe(
      response => {
        console.log(response)
        this.fetchAllLeads();
        this.updateclosebutton.nativeElement.click();
      }
    );
  }
  addLead()
  {
    console.log(this.leadLists);

    this.leadService.createLead(this.leadLists).subscribe(
      data => {
        console.log(data);
        this.fetchAllLeads();
        this.addclosebutton.nativeElement.click();
        this.leadLists=new LeadList(null,null,null,null,null,null,null,null,null,null,null,null);
      }
    )
  }

}
