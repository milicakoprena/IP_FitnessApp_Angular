import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ChatService } from '../services/chat.service';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  message = '';
  messages: any[] = [];
  username: string = '';

  constructor(
    private chatService: ChatService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.username = this.loginService.getUser().username;
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
      this.scrollToBottom();
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.message, this.username);
      this.message = '';
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom', err);
    }
  }

  getUserColor(username: string): string {
    const hash = username.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + (acc << 6) + (acc << 16) - acc;
    }, 0);
    const color =
      '#' + (0x1000000 + (hash & 0xffffff)).toString(16).slice(1, 4);
    return color;
  }
}
