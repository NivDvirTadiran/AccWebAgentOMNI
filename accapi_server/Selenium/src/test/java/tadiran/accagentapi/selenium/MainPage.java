package tadiran.accagentapi.selenium;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;

import static com.codeborne.selenide.Selenide.*;

// page_url = https://www.jetbrains.com/
public class MainPage {
  public SelenideElement seeDeveloperToolsButton = $x("//*[@data-test-marker='Developer Tools']");
  public SelenideElement findYourToolsButton = $x("//*[@data-test='suggestion-action']");
  public SelenideElement toolsMenu = $x("//div[@data-test='main-menu-item' and @data-test-marker = 'Developer Tools']");
  public SelenideElement searchButton = $("[data-test='site-header-search-action']");
  public SelenideElement searchQuestionMarkButton = $x("//chat-widget");
  public SelenideElement searchQuestionMarkButton2 = $x("//chat-widget//*[@id='shadow-root']");
  public SelenideElement mNameInput = $(By.xpath("/html/body/chat-widget//div/div/app-login-form/form/div[1]/input"));

  public SelenideElement preWindowWebpackPushFunction = $("pre");

  public ElementsCollection chatwidget = $$("chat-widget.ng-tns-c23-0");

  public SelenideElement chatwidget2 = $("chat-widget.ng-tns-c23-0");
}
