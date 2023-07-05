import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'app-shared-custom-select',
    templateUrl: './custom.component.html',
    styles: [`
    span{
      display:block;
      position: relative;
    }
    ul{
      position: absolute;
      top: 50px;
      left: 0px;
      padding: 10px;
      width: max-content;
      max-height: 400px;
      background: white;
      overflow:hidden;
      overflow-y: scroll;
      border-radius: 10px;
      list-style: none;
      z-index: 10;
      -webkit-box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.75);
      box-shadow: 1px 1px 10px 0px rgba(0,0,0,0.75);
    }
    ul li {
      padding: 5px;
    }
    ul li:hover {
      cursor: pointer;
      background: #ddd;
    }
  `]
})
export class CustomSelectComponent implements OnInit {

    public showList: boolean = false
    public customList: any
    private choose: boolean = false
    @Input() name!: string
    @Input() lists!: any
    @Input() reset: boolean = false
    @Input() selectId: Number | undefined
    @Output() selected = new EventEmitter<number | null>()
    @ViewChild('sharedInput', { static: true }) sharedInput!: ElementRef

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges() {
        this.customList = this.lists
        if (this.reset) {
            this.sharedInput.nativeElement.value = ""
            this.sharedInput.nativeElement.classList.remove('ng-dirty', 'ng-invalid', 'ng-touched', 'ng-valid')
        }
        if (this.lists && this.selectId) {
            this.sharedInput.nativeElement.value = this.lists.find((list: { id: Number; }) => list.id == this.selectId)?.name
        }
    }

    @HostListener('keydown.escape')
    hostListener() {
        this.showList = false
    }

    inputValue(event: any) {
        this.customList = this.lists
        if (this.choose) {
            this.clear(null)
        }
        if (event.target.value.length) {
            this.customList = this.lists.filter((obj: { name: String; }) => obj.name.toLowerCase().includes(event.target.value.toLowerCase()))
        }
    }

    selectValue(event: any) {
        if (event.target.dataset.id) {
            this.choose = !this.choose
            this.sharedInput.nativeElement.value = event.target.dataset.value
            this.sharedInput.nativeElement.classList.remove('ng-invalid')
            this.sharedInput.nativeElement.classList.add('ng-dirty', 'ng-valid')
            this.selected.emit(Number(event.target.dataset.id))
        } else {
            this.choose = !this.choose
            this.sharedInput.nativeElement.value = ""
            this.sharedInput.nativeElement.classList.remove('ng-dirty')
            this.sharedInput.nativeElement.classList.add('ng-invalid', 'ng-touched')
            this.selected.emit(null)
        }
        this.showList = false
    }

    select(event: any) {
        this.showList = true
    }

    clear(event: any) {
        this.choose = !this.choose
        this.sharedInput.nativeElement.value = ""
        this.sharedInput.nativeElement.classList.remove('ng-dirty')
        this.sharedInput.nativeElement.classList.add('ng-invalid', 'ng-touched')
        this.selected.emit(null)
    }

    focusout(event: any) {
        setTimeout(() => {
            this.showList = false
        }, 200)
    }
}
