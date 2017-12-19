import { Component, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentDidLoad() {
    // handle service worker updates
    window.addEventListener('swUpdate', () => {
      this.toastCtrl.create({
        message: 'New version available',
        showCloseButton: true,
        closeButtonText: 'Reload'
      }).then((toast) => {
        console.log(toast);
        toast.present();
      });
    })
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <stencil-router>
          <stencil-route url='/' component='app-home' exact={true}>
          </stencil-route>

          <stencil-route url='/profile/:name' component='app-profile'>
          </stencil-route>
        </stencil-router>
      </ion-app>
    );
  }
}
