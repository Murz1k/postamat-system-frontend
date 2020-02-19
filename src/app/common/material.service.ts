declare var M;

export class MaterialService {

    /**
     * Всплывающее сообщение
     * @param message - string. Текст отображаемого сообщения
     */
    static toast(message: string) {
        M.toast({html: message});
    }

    static selectsForm() {
        const selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);
    }

    static updateTextInputs() {
        M.updateTextFields();
    }

    static initTabs() {
        const tabsOption = {
            duration: 400,
            onShow: null,
            swipeable: false,
            responsiveThreshold: window.screen.width
        };
        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs, tabsOption);
    }

    static initCollapsible() {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);
    }

    static initAdaptiveMenu() {
        const navbars = document.querySelectorAll('.sidenav');
        M.Sidenav.init(navbars);
    }
}
