import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  showButton = false;

  constructor(
    private flash: Flashlight,
    public platform: Platform
  ) {}

  async ngOnInit() {
    await this.platform.ready();
    this.checkShowButton();
    this.checkBackButton();
  }

  async checkShowButton() {
    this.showButton = this.isMobile() && await this.hasFlash();

    if (this.showButton) {
      this.platform.pause.subscribe(() => {
        this.flash.switchOff();
      });
    }
  }

  private isMobile() {
    return !!this.platform.platforms().find(platform =>
      ['mobile', 'tablet', 'phablet'].includes(platform));
  }

  private async hasFlash() {
    return await this.flash.available();
  }

  toggleFlash() {
    this.flash.toggle();
  }

  private checkBackButton() {
    this.platform.backButton.subscribe(() => {
      // Comprobar navegación ??
      // Salir de la app ??
    });
  }

  ngOnDestroy() {
    this.flash.switchOff();
  }
}
