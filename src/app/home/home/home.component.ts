import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../services/rss-feed.service';
import { PageEvent } from '@angular/material/paginator';
import { parseString } from 'xml2js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  facts: any[] = [];
  pagedFacts: any[] = [];
  length: number = 0;
  pageSize: number = 2;
  pageSizeOptions: number[] = [2];

  constructor(private rssFeedService: RssFeedService) {}

  ngOnInit(): void {
    this.loadFacts();
  }

  private loadFacts(): void {
    this.rssFeedService.getRssFeed().subscribe(
      (data: any) => {
        this.facts = this.parseXml(data);
        this.pagedFacts = this.facts.slice(0, 2);
        this.length = this.facts.length;
      },
      (error: any) => {
        console.error('Error consuming RSS feed:', error);
      }
    );
  }

  private parseXml(data: string): any[] {
    let parsedItems: any[] = [];
    parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        return;
      }
      const items = result?.rss?.channel[0]?.item || [];
      parsedItems = items.map((item: any) => ({
        title: item.title[0],
        link: item.link[0],
        description: item.description[0],
      }));
    });
    return parsedItems;
  }

  onPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedFacts = this.facts.slice(startIndex, endIndex);
  }
}
