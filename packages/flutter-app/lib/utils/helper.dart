import 'dart:async';

import 'package:eip55/eip55.dart';
import 'package:flutter/rendering.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:walletconnect_dart/walletconnect_dart.dart';

import '../model/app_info.dart';
import '../model/crypto_wallet.dart';
import './deeplink.dart';
import './wallet_connect_ethereum_credentials.dart';

/// WalletConnectHelper is an object for implement WalletConnect protocol for
/// mobile apps using deep linking to connect with wallets.
class WalletConnectHelper {
  static const String ethRinkebyTestnetEndpoints =
      'https://rinkeby.infura.io/v3/e3090e47c3624aa3aa126fa7297bff9b';

  final String? bridge;

  /// mobile app info
  final AppInfo appInfo;

  late WalletConnect connector;

  SessionStatus? sessionStatus;
  List<String> accounts = [];

  /// Connector using brigde 'https://bridge.walletconnect.org' by default.
  WalletConnectHelper({
    this.bridge,
    required this.appInfo,
  }) {
    connector = getWalletConnect();
  }

  WalletConnect getWalletConnect() {
    final WalletConnect connector = WalletConnect(
      bridge: bridge ?? 'https://bridge.walletconnect.org',
      clientMeta: PeerMeta(
        name: appInfo.name ?? 'WalletConnect',
        description: appInfo.description ?? 'WalletConnect Developer App',
        url: appInfo.url ?? 'https://walletconnect.org',
        icons: appInfo.icons ??
            [
              'https://gblobscdn.gitbook.com/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media'
            ],
      ),
    );
    return connector;
  }

  //----------------------------------------------------------------

  void reset() {
    connector = getWalletConnect();
  }

  Future<bool> initSession({int? chainId}) async {
    if (!connector.connected) {
      try {
        sessionStatus = await connector.createSession(
          chainId: chainId,
          onDisplayUri: (uri) async {
            print(uri);
            await _connectWallet(displayUri: uri);
          },
        );

        accounts = sessionStatus?.accounts ?? [];

        return true;
      } catch (e) {
        debugPrint('createSession() - failure - $e');
        reset();
        return false;
      }
    } else {
      return true;
    }
  }

  Future<void> _connectWallet({
    CryptoWallet wallet = CryptoWallet.metamask,
    required String displayUri,
  }) async {
    var deeplink = DeeplinkUtil.getDeeplink(wallet: wallet, uri: displayUri);
    bool isLaunch = await launchUrl(Uri.parse(deeplink),
        mode: LaunchMode.externalApplication);
    if (!isLaunch) {
      throw 'connectWallet() - failure - Could not open $deeplink.';
    }
  }

  Future<String> getPublicAddress(
      {CryptoWallet wallet = CryptoWallet.metamask}) async {
    if (!connector.connected) {
      await initSession();
    }

    if (accounts.isNotEmpty) {
      String address = accounts.first;
      address = toEIP55Address(address);
      return address;
    } else {
      throw 'Unexpected exception';
    }
  }

  WalletConnectEthereumCredentials getEthereumCredentials() {
    EthereumWalletConnectProvider provider =
        EthereumWalletConnectProvider(connector);
    WalletConnectEthereumCredentials credentials =
        WalletConnectEthereumCredentials(provider: provider);
    return credentials;
  }

  Future<void> dispose() async {
    connector.session.reset();
    await connector.killSession();
    await connector.close();

    sessionStatus = null;
    accounts = [];

    reset();
  }
}
