import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let injector: TestBed;
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    injector = getTestBed();
    service = injector.get(TicketService);
    httpMock = injector.get(HttpTestingController);
  });
  
  it('first status should be OPEN', () => {
    const statusMap: any = service.getStatusMap();
    expect(statusMap[0]).toEqual('OPEN');
  });
  
  it('first priority should be LOW', () => {
    const priorityMap: any = service.getPriorityMap();
    expect(priorityMap[0]).toEqual('LOW');
  });
});
